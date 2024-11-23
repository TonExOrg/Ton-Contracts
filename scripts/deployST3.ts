import { toNano } from '@ton/core';
import { ST3 } from '../wrappers/ST3';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const sT3 = provider.open(await ST3.fromInit());

    await sT3.send(
        provider.sender(),
        {
            // value: 0n,
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(sT3.address);

    // run methods on `sT3`
}
