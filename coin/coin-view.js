const { Coin } = require('./coin');
const { Tx } = require('../tx/tx');

let coinViewInstance = null;
class CoinView {
    constructor () {
        if (coinViewInstance) {
            return coinViewInstance;
        }

        this.coinMap = {};
        this.walletMap = {};

        coinViewInstance = this;
    }

    hasCoinkey (coinKey) {
        return !!this.coinMap[coinKey];
    }

    getCoinsByPubKey (pubkey) {
        let ret = [];
        let coins = this.walletMap[pubkey] || [];

        for (let coin of coins) {
            let txOutput = coin.txOutput;
            if (!this.hasCoinkey(txOutput.hash())){
                continue;
            }

            ret.push(coin);

        }

        return ret;
    }

    getCoinByCoinKey (coinKey) {
        if (this.hasCoinkey(coinKey)) {
            return this.coinMap[coinKey];
        } else {
            throw '[Info] given coinKey is spent';
        }
    }

    addCoins (txOutputs) {
        for (let output of txOutputs) {
            let pubKey = output.pubKey;
            let coinKey = output.hash();
            
            if (this.hasCoinkey(coinKey)) {

                console.log(`wtf ${pubKey}`);
                continue;
            }

            let newCoin = new Coin(output);

            this.coinMap[coinKey] = newCoin;

            if (typeof this.walletMap[pubKey] === 'undefined') {
                this.walletMap[pubKey] = [];
            }

            this.walletMap[pubKey].push(newCoin);
            // console.log(`wallet : ${JSON.stringify(this.walletMap[pubKey])}`);
        }
    }

    deleteCoins (txInputs) {
        for (let input of txInputs) {
            let prevOut = input.prevOut;
            let coinKey = prevOut.hash();
            try {
                let coin = this.getCoinByCoinKey(coinKey);
                coin.setSpent();

                delete this.coinMap[coin.toHash()];
            } catch (e) {
                console.log(e);
                continue;
            }

        }
    }

    updateCoins (tx) {
        if (! (tx instanceof Tx) ) {
            throw '[Err] given param is not a Transaction';
        }

        if (!tx.isCoinbase())
            this.deleteCoins(tx.txInputs);

        this.addCoins(tx.txOutputs);
    }
}

module.exports.CoinView = CoinView;