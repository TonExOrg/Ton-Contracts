import { Address, toNano, fromNano } from '@ton/core';
import { JettonMinter } from '../wrappers/JettonMinter';
import { compile, NetworkProvider, UIProvider } from '@ton/blueprint';
import { displayContentCell } from '../wrappers/ui-utils';

export async function run(provider: NetworkProvider) {
    const ui: UIProvider = provider.ui();

    const senderAddress = provider.sender()?.address;
    if (!senderAddress) {
        throw new Error('Sender address is undefined.');
    }

    const jettonMinter = provider.open(
        JettonMinter.createFromAddress(Address.parse('EQBuz5edNRKHF30l-G1A75FmIWc2uKMmkJs3KdK2mDfLT53J')),
    );

    const jettonData = await jettonMinter.getJettonData();

    console.log('Jetton info:\n\n');
    console.log(`Admin:${jettonData.adminAddress}\n`);
    console.log(`Total supply:${fromNano(jettonData.totalSupply)}\n`);
    console.log(`Mintable:${jettonData.mintable}\n`);

    displayContentCell(jettonData.content, ui);
}
