import { toNano } from '@ton/core';
import { Borrow } from '../wrappers/Borrow';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    try {
        console.log('Starting Borrow contract deployment...');

        const borrow = provider.open(await Borrow.fromInit());
        console.log('Contract address:', borrow.address.toString());

        // Deploy contract with initial balance
        console.log('Deploying contract...');
        await borrow.send(
            provider.sender(),
            {
                value: toNano('0.1'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        await provider.waitForDeploy(borrow.address);
        console.log('Contract deployed successfully');

    } catch (error) {
        console.error('Error deploying contract:');
        console.error(error);
        process.exit(1);
    }
}
