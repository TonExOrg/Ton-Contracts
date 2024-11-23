import { Address, toNano, fromNano, beginCell } from '@ton/core';
import { JettonWallet } from '../wrappers/JettonWallet';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const sender = provider.sender();

    // const senderAddress = provider.sender()?.address;
    const senderAddress = Address.parse('EQACoCt5FVOqiOPTp05x8kYGIy2yCbxQQU0JuImgo5R2lEZi');
    if (!senderAddress) {
        throw new Error('Sender address is undefined.');
    }

    const jettonWallet = provider.open(
        JettonWallet.createFromAddress(Address.parse('EQACoCt5FVOqiOPTp05x8kYGIy2yCbxQQU0JuImgo5R2lEZi')),
    );

    let sendAmount = toNano(10); // <-- Amount of Jettons to send
    let forwardAmount = toNano('0.05'); // Forward amount TODO: Calculate this dynamically

    const send = await jettonWallet.sendTransfer(
        sender,
        toNano(0.1), // Transaction fee TODO: Calculate this dynamically
        sendAmount,
        Address.parse('0QBhJZNjL0YViuWDwwnF9Wu7iCMnNZmcExcl-Tv7GGMd9jwt'),
        senderAddress,
        beginCell().endCell(),
        forwardAmount,
        beginCell().endCell(),
    );
}
