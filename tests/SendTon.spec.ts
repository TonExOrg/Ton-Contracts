import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { SendTon } from '../wrappers/SendTon';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('SendTon', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('SendTon');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let user: SandboxContract<TreasuryContract>;
    let sendTon: SandboxContract<SendTon>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');
        user = await blockchain.treasury('user');

        sendTon = blockchain.openContract(
            SendTon.createFromConfig({
                deployer: deployer.address,
            }, code)
        );

        await sendTon.sendDeploy(deployer.getSender(), toNano('1'));
    });

    it('should work', async () => {
        const result = await sendTon.sendRequestTON(
            user.getSender(),
            toNano('0.1')
        );

        expect(result.transactions).toHaveTransaction({
            from: sendTon.address,
            to: user.address,
            success: true,
            value: toNano('0.05'),
        });
    });
});
