import { Address, beginCell, Cell, Contract, ContractProvider, Sender, SendMode, contractAddress } from '@ton/core';

export type BorrowConfig = {};

export function borrowConfigToCell(config: BorrowConfig): Cell {
    return beginCell().endCell();
}

export class BorrowContract implements Contract {
    readonly address: Address;
    readonly init?: { code: Cell; data: Cell };

    constructor(address: Address, init?: { code: Cell; data: Cell }) {
        this.address = address;
        this.init = init;
    }

    static createFromAddress(address: Address) {
        return new BorrowContract(address);
    }

    static createFromConfig(config: BorrowConfig, code: Cell, workchain = 0) {
        const data = borrowConfigToCell(config);
        const init = { code, data };
        return new BorrowContract(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(0, 32).storeStringTail('Deploy').endCell(),
        });
    }

    async sendSetCreditScore(
        provider: ContractProvider,
        via: Sender,
        opts: {
            value: bigint;
            bounce?: boolean;
            user: Address;
            creditScore: bigint;
        }
    ) {
        return provider.internal(via, {
            value: opts.value,
            bounce: opts.bounce,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(0x123, 32)
                .storeAddress(opts.user)
                .storeInt(opts.creditScore, 257)
                .endCell(),
        });
    }

    async sendBorrow(
        provider: ContractProvider,
        via: Sender,
        opts: {
            value: bigint;
            bounce?: boolean;
            collateralToken: Address;
            collateralAmount: bigint;
            borrowAmount: bigint;
        }
    ) {
        return provider.internal(via, {
            value: opts.value,
            bounce: opts.bounce,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(0x456, 32)
                .storeAddress(opts.collateralToken)
                .storeInt(opts.collateralAmount, 257)
                .storeInt(opts.borrowAmount, 257)
                .endCell(),
        });
    }

    async sendRedeemERC20(
        provider: ContractProvider,
        via: Sender,
        opts: {
            value: bigint;
            bounce?: boolean;
            token: Address;
            amount: bigint;
        }
    ) {
        return provider.internal(via, {
            value: opts.value,
            bounce: opts.bounce,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(0x789, 32)
                .storeAddress(opts.token)
                .storeInt(opts.amount, 257)
                .endCell(),
        });
    }

    async sendPerformLiquidation(
        provider: ContractProvider,
        via: Sender,
        opts: {
            value: bigint;
            bounce?: boolean;
            user: Address;
        }
    ) {
        return provider.internal(via, {
            value: opts.value,
            bounce: opts.bounce,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(0xabc, 32)
                .storeAddress(opts.user)
                .endCell(),
        });
    }
}
