import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { ST3 } from '../wrappers/ST3';
import '@ton/test-utils';

describe('ST3', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let sT3: SandboxContract<ST3>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        sT3 = blockchain.openContract(await ST3.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await sT3.send(
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
            to: sT3.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and sT3 are ready to use
    });
});
