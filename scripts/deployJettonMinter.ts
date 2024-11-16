import { Address, toNano } from '@ton/core';
import { JettonMinter } from '../wrappers/JettonMinter';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const senderAddress = provider.sender()?.address;
    if (!senderAddress) {
        throw new Error('Sender address is undefined.');
    }

    const jettonMinter = provider.open(
        JettonMinter.createFromConfig(
            {
                supply: toNano(0), // Enter the initial supply of the Jetton, **recommended to leave it as 0**
                owner: senderAddress, // Enter the address of the owner of the Jetton or leave it as senderAddress
                name: 'tnEthereum', // Enter the name of the Jetton
                symbol: 'tnETH', // Enter the symbol of the Jetton
                image: 'https://avatars.githubusercontent.com/u/6250754?s=200&v=4', // Enter the image of the Jetton
                description: 'Syntethetic token for ETH', // Enter the description of the Jetton
            },
            await compile('JettonMinter'),
        ),
    );

    await jettonMinter.sendDeploy(provider.sender(), toNano('0.25'));

    await provider.waitForDeploy(jettonMinter.address);

    console.log(`Deployed JettonMinter at ${jettonMinter.address}`);
}
