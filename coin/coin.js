class Coin {
    constructor (txOutput) {
        this.spent = false;
        this.txOutput = txOutput;
    }

    isSpent() {
        return this.spent;
    }

    setSpent() {
        this.spent = true;
    }

    toHash() {
        return this.txOutput.hash();
    }
}

module.exports.Coin = Coin;