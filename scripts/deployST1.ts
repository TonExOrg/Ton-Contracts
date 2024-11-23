import { toNano } from '@ton/core';
import { ST1 } from '../wrappers/ST1';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const sT1 = provider.open(await ST1.fromInit());

    await sT1.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(sT1.address);

    // run methods on `sT1`
}
