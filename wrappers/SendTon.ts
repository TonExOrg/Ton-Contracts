import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type SendTonConfig = {
    deployer: Address;
};

export function sendTonConfigToCell(config: SendTonConfig): Cell {
    return beginCell()
        .storeAddress(config.deployer)
        .endCell();
}

export class SendTon implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new SendTon(address);
    }

    static createFromConfig(config: SendTonConfig, code: Cell, workchain = 0) {
        const data = sendTonConfigToCell(config);
        const init = { code, data };
        return new SendTon(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendRequestTON(provider: ContractProvider, via: Sender, value: bigint) {
        return provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(0, 32)
                .storeStringTail('send')
                .endCell(),
        });
    }

    async sendDeposit(provider: ContractProvider, via: Sender, value: bigint) {
        return provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async getBalance(provider: ContractProvider) {
        const result = await provider.get('balance', []);
        return result.stack.readString();
    }
}
