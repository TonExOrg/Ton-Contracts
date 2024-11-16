import "@stdlib/deploy";

// Structure to store user information
struct UserInfo {
    creditScore: Int;
    totalBorrowed: Int;
    totalCollateral: Int;
    erc20Collateral: map<Address, Int>;
    nftCollateral: map<Address, Int>;
}

message(0x123) SetCreditScore {
    user: Address;
    creditScore: Int;
}

message(0x456) Borrow {
    collateralToken: Address;
    collateralAmount: Int;
    borrowAmount: Int;
}

message(0x789) RedeemERC20 {
    collateralToken: Address;
    collateralAmount: Int;
}

message(0xabc) PerformLiquidation {
    user: Address;
}

contract BorrowContract with Deployable {
    const MinTonForStorage: Int = ton("0.01");
    
    owner: Address;
    softLiquidationThreshold: Int;
    maxCreditScore: Int;
    maxThresholdPercent: Int;
    users: map<Address, UserInfo>;
    
    init() {
        self.owner = sender();
        self.softLiquidationThreshold = 110; // 110% of borrowed amount
        self.maxCreditScore = 1000; // Maximum credit score
        self.maxThresholdPercent = 150; // Max threshold percentage for collateral
        self.users = emptyMap();
    }

    // Implementation of trait Deployable
    receive("Deploy") {
        // Deployment logic
        require(self.owner == sender(), "Only owner can deploy");
    }

    receive(msg: SetCreditScore) {
        require(sender() == self.owner, "Only owner can set credit score");
        require(msg.creditScore <= self.maxCreditScore, "Credit score out of range");
        
        if (self.users.get(msg.user) == null) {
            self.users.set(msg.user, UserInfo{
                creditScore: msg.creditScore,
                totalBorrowed: 0,
                totalCollateral: 0,
                erc20Collateral: emptyMap(),
                nftCollateral: emptyMap()
            });
        } else {
            let userInfo: UserInfo = self.users.get(msg.user)!!;
            userInfo.creditScore = msg.creditScore;
            self.users.set(msg.user, userInfo);
        }
    }

    receive(msg: Borrow) {
        require(self.users.get(sender()) != null, "User not found");
        let user: UserInfo = self.users.get(sender())!!;
        require(user.creditScore > 0, "Credit score not set");

        let requiredCollateral: Int = (msg.borrowAmount * self.calculateThresholdPercent(user.creditScore)) / 100;
        require(msg.collateralAmount >= requiredCollateral, "Insufficient collateral");

        // Update user state
        user.totalBorrowed = user.totalBorrowed + msg.borrowAmount;
        if (user.erc20Collateral.get(msg.collateralToken) == null) {
            user.erc20Collateral.set(msg.collateralToken, msg.collateralAmount);
        } else {
            user.erc20Collateral.set(msg.collateralToken, user.erc20Collateral.get(msg.collateralToken)!! + msg.collateralAmount);
        }
        user.totalCollateral = user.totalCollateral + msg.collateralAmount;
        self.users.set(sender(), user);

        // Transfer borrowed amount to user
        send(SendParameters{
            to: sender(),
            value: msg.borrowAmount,
            mode: SendIgnoreErrors
        });
    }

    receive(msg: RedeemERC20) {
        require(self.users.get(sender()) != null, "User not found");
        let user: UserInfo = self.users.get(sender())!!;
        require(user.erc20Collateral.get(msg.collateralToken) != null, "No collateral found");
        let collateralBalance: Int = user.erc20Collateral.get(msg.collateralToken)!!;
        require(collateralBalance >= msg.collateralAmount, "Insufficient collateral balance");

        // Update state
        user.erc20Collateral.set(msg.collateralToken, collateralBalance - msg.collateralAmount);
        user.totalCollateral = user.totalCollateral - msg.collateralAmount;
        self.users.set(sender(), user);

        // Transfer collateral back to user
        send(SendParameters{
            to: msg.collateralToken,
            value: msg.collateralAmount,
            mode: SendIgnoreErrors
        });
    }

    receive(msg: PerformLiquidation) {
        require(sender() == self.owner, "Only owner can perform liquidation");
        require(self.users.get(msg.user) != null, "User not found");
        
        let user: UserInfo = self.users.get(msg.user)!!;
        let thresholdPercent: Int = self.calculateThresholdPercent(user.creditScore);

        if ((user.totalCollateral * 100) / user.totalBorrowed < thresholdPercent) {
            // Liquidate user's collateral
            // Reset user's state
            user.totalBorrowed = 0;
            user.totalCollateral = 0;
            user.erc20Collateral = emptyMap();
            user.nftCollateral = emptyMap();
            self.users.set(msg.user, user);
        }
    }

    fun calculateThresholdPercent(creditScore: Int): Int {
        // Higher credit score = lower collateral requirement
        // Credit score of 1000 = 110% collateral required
        // Credit score of 0 = 150% collateral required
        let range: Int = self.maxThresholdPercent - self.softLiquidationThreshold;
        return self.maxThresholdPercent - ((creditScore * range) / self.maxCreditScore);
    }
}
