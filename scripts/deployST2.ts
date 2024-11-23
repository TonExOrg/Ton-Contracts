import { toNano } from '@ton/core';
import { ST2 } from '../wrappers/ST2';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const sT2 = provider.open(await ST2.fromInit());

    await sT2.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(sT2.address);

    // run methods on `sT2`
}
