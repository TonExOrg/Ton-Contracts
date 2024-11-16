import { toNano } from '@ton/core';
import { SendTon } from '../wrappers/SendTon';
import { NetworkProvider } from '@ton/blueprint';
import { compile } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    try {
        console.log('Starting deployment process...');

        const sendTon = provider.open(
            SendTon.createFromConfig({
                deployer: provider.sender().address!,
            }, await compile('SendTon'))
        );

        console.log('Contract instance created');
        console.log('Contract address will be:', sendTon.address.toString());

        // Deploy contract with initial balance for sending to users
        console.log('Deploying contract...');
        await sendTon.sendDeploy(provider.sender(), toNano('0.05'));

        await provider.waitForDeploy(sendTon.address);
        console.log('Contract successfully deployed at:', sendTon.address.toString());
        console.log('Users can now send "claim" message to receive 0.05 TON');

    } catch (err: any) {
        console.error('Error in deployment:');
        console.error('Error message:', err?.message || 'Unknown error');
        console.error('Full error:', JSON.stringify(err, null, 2));
        throw err;
    }
}
