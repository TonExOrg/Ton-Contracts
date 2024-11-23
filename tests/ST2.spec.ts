import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { ST2 } from '../wrappers/ST2';
import '@ton/test-utils';

describe('ST2', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let sT2: SandboxContract<ST2>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        sT2 = blockchain.openContract(await ST2.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await sT2.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: sT2.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and sT2 are ready to use
    });
});
