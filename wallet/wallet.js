const { randomBytes } = require('crypto');
const { sign } = require('../common/util');
const { CoinView } = require('../coin/coin-view');
const { TxOut, TxIn, Tx } = require('../tx/tx');
const { scriptSig } = require('../script/script');

const secp256k1 = require('secp256k1');


class Wallet {
    constructor (nickname) {
        this.privKey = this.generatePrivKey();
        this.pubKey = secp256k1.publicKeyCreate(this.privKey);


        this.nickname = nickname || this.pubKey;

        this.coins = [];
        this.coinview = new CoinView();
    }

    generatePrivKey() {
        let privKey;

        do {
            privKey = randomBytes(32);
        } while(!secp256k1.privateKeyVerify(privKey));

        return privKey;
    }

    syncCoins () {
        this.coins = this.coinview.getCoinsByPubKey(this.pubKey);
    }

    getBudget () {
        this.syncCoins();
        // console.log(`coins : ${JSON.stringify(this.coins)}`);
        let ret = 0;

        for(let coin of this.coins) {
            ret += coin.txOutput.value;
        }

        console.log(`${this.nickname} : ${ret} ys`);

        return ret;
    }

    sign (msg) {
        return sign(msg, this.privKey);
    }

    makeTx ( to ) {

        this.syncCoins();

        if (this.coins.length === 0) {
            console.log(`[Alert] ${this.pubKey} has no coins`);
            return null;
        }

        if (to instanceof Wallet) {
            to = to.pubKey;
        }

        let prevOut = this.coins[0].txOutput;

        let txout = [new TxOut(prevOut.value, to)];
        let txin = [new TxIn( prevOut,
                          scriptSig(
                            this.sign(prevOut.hash()),
                            this.pubKey
                          ))];

        return new Tx(txout, txin);
    }

}

module.exports.Wallet = Wallet;