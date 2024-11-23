import { Address, toNano, fromNano } from '@ton/core';
import { JettonMinter } from '../wrappers/JettonMinter';
import { compile, NetworkProvider } from '@ton/blueprint';

async function getEthPrice(): Promise<number> {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        return data.ethereum.usd;
    } catch (error) {
        console.error('Error fetching ETH price:', error);
        return 2000; // Default fallback price if API fails
    }
}

export async function run(provider: NetworkProvider, args: string[]) {
    const sender = provider.sender();

    const senderAddress = provider.sender()?.address;
    if (!senderAddress) {
        throw new Error('Sender address is undefined.');
    }
    const contractAddress = Address.parse('EQBd-WK72MdjLDMg0-19vXo0CYnFoXHcMSdUWj45TrzA3CDg');
    const jettonMinter = provider.open(
        JettonMinter.createFromAddress(contractAddress),
    );

    // Get mint amount from arguments (default to 1 if not specified)
    const mintAmount = args.length > 0 ? Number(args[0]) : 1;
    if (isNaN(mintAmount) || mintAmount <= 0) {
        throw new Error('Invalid mint amount. Please provide a positive number.');
    }

    // Get current ETH price from CoinGecko
    const ethPrice = await getEthPrice();
    const totalValueUsd = mintAmount * ethPrice;

    console.log("\nCurrent ETH Price: $${ethPrice.toFixed(2)}");
    console.log("Minting ${mintAmount} tokens (${mintAmount} ETH ≈ $${totalValueUsd.toFixed(2)})");

    const supplyBefore = await jettonMinter.getTotalSupply();
    const nanoMint = toNano(mintAmount);

    console.log("Sending transaction. Approve in your wallet...");
    const res = await jettonMinter.sendMint(sender, contractAddress, senderAddress, nanoMint, toNano('0.05'), toNano('0.1'));
    console.log("Sent transaction");

    console.log("Minting ${mintAmount} tokens to ${senderAddress} and waiting 20s...");

    await new Promise((resolve) => setTimeout(resolve, 20000));
    const supplyAfter = await jettonMinter.getTotalSupply();

    if (supplyAfter == supplyBefore + nanoMint) {
        const totalSupply = Number(fromNano(supplyAfter));
        console.log('Mint successful!');
        console.log(`Current supply: ${totalSupply} tokens (${totalSupply} ETH ≈ $${(totalSupply * ethPrice).toFixed(2)})`);
    } else {
        console.log('Mint failed!');
    }
}