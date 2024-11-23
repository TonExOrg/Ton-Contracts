import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { ST1 } from '../wrappers/ST1';
import '@ton/test-utils';

describe('ST1', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let sT1: SandboxContract<ST1>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        sT1 = blockchain.openContract(await ST1.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await sT1.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: sT1.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and sT1 are ready to use
    });
});
