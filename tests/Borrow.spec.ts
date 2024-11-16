import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { BorrowContract } from '../wrappers/Borrow';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Borrow', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Borrow');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let user: SandboxContract<TreasuryContract>;
    let collateralToken: SandboxContract<TreasuryContract>;
    let borrow: SandboxContract<BorrowContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');
        user = await blockchain.treasury('user');
        collateralToken = await blockchain.treasury('collateralToken');

        borrow = blockchain.openContract(
            BorrowContract.createFromConfig({}, code)
        );

        const deployResult = await borrow.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: borrow.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // Already tested in beforeEach
        const deployed = await blockchain.getContract(borrow.address);
        expect(deployed.account).toBeDefined();
    });

    describe('Credit Score Management', () => {
        it('should set credit score when called by owner', async () => {
            const result = await borrow.sendSetCreditScore(
                deployer.getSender(),
                {
                    value: toNano('0.05'),
                    user: user.address,
                    creditScore: 800n,
                }
            );

            expect(result.transactions).toHaveTransaction({
                from: deployer.address,
                to: borrow.address,
                success: true,
            });
        });

        it('should fail to set credit score when called by non-owner', async () => {
            const result = await borrow.sendSetCreditScore(
                user.getSender(),
                {
                    value: toNano('0.05'),
                    user: user.address,
                    creditScore: 800n,
                }
            );

            expect(result.transactions).toHaveTransaction({
                from: user.address,
                to: borrow.address,
                success: false,
            });
        });

        it('should fail to set credit score above maximum', async () => {
            const result = await borrow.sendSetCreditScore(
                deployer.getSender(),
                {
                    value: toNano('0.05'),
                    user: user.address,
                    creditScore: 1200n,
                }
            );

            expect(result.transactions).toHaveTransaction({
                from: deployer.address,
                to: borrow.address,
                success: false,
            });
        });
    });

    describe('Borrowing', () => {
        beforeEach(async () => {
            await borrow.sendSetCreditScore(
                deployer.getSender(),
                {
                    value: toNano('0.05'),
                    user: user.address,
                    creditScore: 800n,
                }
            );
        });

        it('should allow borrowing with sufficient collateral', async () => {
            const result = await borrow.sendBorrow(
                user.getSender(),
                {
                    value: toNano('0.05'),
                    collateralToken: collateralToken.address,
                    collateralAmount: toNano('150'),
                    borrowAmount: toNano('100'),
                }
            );

            expect(result.transactions).toHaveTransaction({
                from: user.address,
                to: borrow.address,
                success: true,
            });
        });

        it('should fail borrowing with insufficient collateral', async () => {
            const result = await borrow.sendBorrow(
                user.getSender(),
                {
                    value: toNano('0.05'),
                    collateralToken: collateralToken.address,
                    collateralAmount: toNano('50'),
                    borrowAmount: toNano('100'),
                }
            );

            expect(result.transactions).toHaveTransaction({
                from: user.address,
                to: borrow.address,
                success: false,
            });
        });
    });

    describe('Collateral Redemption', () => {
        beforeEach(async () => {
            await borrow.sendSetCreditScore(
                deployer.getSender(),
                {
                    value: toNano('0.05'),
                    user: user.address,
                    creditScore: 800n,
                }
            );

            await borrow.sendBorrow(
                user.getSender(),
                {
                    value: toNano('0.05'),
                    collateralToken: collateralToken.address,
                    collateralAmount: toNano('150'),
                    borrowAmount: toNano('100'),
                }
            );
        });

        it('should allow redeeming collateral', async () => {
            const result = await borrow.sendRedeemERC20(
                user.getSender(),
                {
                    value: toNano('0.05'),
                    token: collateralToken.address,
                    amount: toNano('50'),
                }
            );

            expect(result.transactions).toHaveTransaction({
                from: user.address,
                to: borrow.address,
                success: true,
            });
        });

        it('should fail redeeming more than deposited collateral', async () => {
            const result = await borrow.sendRedeemERC20(
                user.getSender(),
                {
                    value: toNano('0.05'),
                    token: collateralToken.address,
                    amount: toNano('200'),
                }
            );

            expect(result.transactions).toHaveTransaction({
                from: user.address,
                to: borrow.address,
                success: false,
            });
        });
    });

    describe('Liquidation', () => {
        beforeEach(async () => {
            await borrow.sendSetCreditScore(
                deployer.getSender(),
                {
                    value: toNano('0.05'),
                    user: user.address,
                    creditScore: 800n,
                }
            );

            await borrow.sendBorrow(
                user.getSender(),
                {
                    value: toNano('0.05'),
                    collateralToken: collateralToken.address,
                    collateralAmount: toNano('110'),
                    borrowAmount: toNano('100'),
                }
            );
        });

        it('should allow owner to perform liquidation', async () => {
            const result = await borrow.sendPerformLiquidation(
                deployer.getSender(),
                {
                    value: toNano('0.05'),
                    user: user.address,
                }
            );

            expect(result.transactions).toHaveTransaction({
                from: deployer.address,
                to: borrow.address,
                success: true,
            });
        });

        it('should fail liquidation when called by non-owner', async () => {
            const result = await borrow.sendPerformLiquidation(
                user.getSender(),
                {
                    value: toNano('0.05'),
                    user: user.address,
                }
            );

            expect(result.transactions).toHaveTransaction({
                from: user.address,
                to: borrow.address,
                success: false,
            });
        });
    });
});
