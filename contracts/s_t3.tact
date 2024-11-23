import "@stdlib/deploy";
message Withdraw {
    amount: Int as coins;
}

contract ST3 with Deployable {
    //const MinTonForStorage: Int = ton("0.01");
    //deployer: Address;
    //receiver: Address;

    const MinTonForStorage: Int = ton("0.01"); // enough for 1 KB of storage for 2.5 years
    deployer: Address;

    init() {
        //self.receiver = sender();
        self.deployer = sender();
    }

    // accept incoming TON transfers
    receive() {
        dump("funds received");
    }

    // this will send 0.05 TON to the user
    receive(msg: Withdraw) {
        //require(sender() == self.deployer, "Only deployer is allowed to withdraw");
        let amount: Int = min(msg.amount, myBalance() - context().value - self.MinTonForStorage);
        require(amount > 0, "Insufficient balance");
        send(SendParameters{
            to: sender(),
            bounce: true,
            value: amount,
            mode: SendRemainingValue + SendIgnoreErrors
        });
    }
 
 
    get fun balance(): String {
        return myBalance().toCoinsString();
    }
}