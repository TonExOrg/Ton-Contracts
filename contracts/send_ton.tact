import "@stdlib/deploy";

contract SendTon with Deployable {
    const MinTonForStorage: Int = ton("0.01");
    deployer: Address;
    receiver: Address;

    init() {
        self.deployer = sender();
        self.receiver = sender();  // initialize receiver as the deployer for now
    }

    // accept incoming TON transfers
    receive() {
        dump("funds received");
    }

    // this will send 0.05 TON to the user
    receive("send") {
        require(myBalance() >= ton("0.06"), "Insufficient balance"); // 0.05 + 0.01 for storage
        send(SendParameters{
            to: sender(),  // sends to whoever called the contract
            bounce: true,
            value: ton("0.05"),
            mode: SendIgnoreErrors,
            body: "Sending 0.05 TON".asComment()  // add a message
        });
    }
 
    get fun balance(): String {
        return myBalance().toCoinsString();
    }
}