import { toNano, Address } from '@ton/core';
import { SendTon } from '../wrappers/SendTon';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const sendTon = provider.open(SendTon.createFromAddress(
        Address.parse("EQC5ld5xK8fQmi5ex7y2dnNFmVM0xtctVzyCf5iOW3zWKwcn")
    ));

    // Send the "send" message with some TON for gas
    await sendTon.sendRequestTON(provider.sender(), toNano('0.1'));

    console.log('Sent request to contract');
}
