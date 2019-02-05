const { txhash } = require('../common/util');
const { p2pkh } = require('../script/script');
const { nowTimestamp } = require('../common/util');
class Tx {
    constructor (txOutputs = [], txInputs) {
        this.nVersion = 0.1;
        this.nLocktime = 0;

        this._setTxInputs(txInputs);
        this._setTxOutputs(txOutputs);

    }
    
    isCoinbase () {
        return typeof this.txInputs === 'undefined' || this.txInputs.length === 0;
    }

    _setTxInputs(txInputs) {
        if (typeof txInputs === 'undefined') return;

        if (!Array.isArray(txInputs)) throw `[TYPE ERR]_setTxInputs : tx inputs accept array of undefined ${JSON.stringify(txInputs)}`;

        for(let input of txInputs) {
            if (! input instanceof TxIn) {
                throw `[TYPE ERR]_setTxOutputs : given parameter contains not instance of TxIn ${JSON.stringify(txInputs)}`;
            }
        }

        this.txInputs = txInputs;
    }

    _setTxOutputs(txOutputs) {
        if (!Array.isArray(txOutputs)) throw `[TYPE ERR]_setTxOutputs : tx outputs only accept type array ${JSON.stringify(txOutputs)}`;

        for(let output of txOutputs) {
            if (! output instanceof TxOut) {
                throw `[TYPE ERR]_setTxOutputs : given parameter contains not instance of TxOut ${JSON.stringify(txOutputs)}`;
            }
        }

        this.txOutputs = txOutputs;
    }

    toString() {
        return JSON.stringify({
            inputs: this.txInputs,
            outpus: this.txOutputs
        });    
    }

    serialize() {
        return new Buffer(this.toString());
    }

    hash() {
        return txhash(this.serialize());
    }

}

class TxOut {
    constructor (value, pubKey) {
        this.value = value;
        this.pubKey = pubKey;
        this.scriptPubkey = p2pkh(pubKey);
        this.timeStamp = nowTimestamp();
    }

    toString() {
        return JSON.stringify({
            value : this.value,
            pubKey :  this.pubKey,
            scriptPubkey : this.scriptPubkey,
            timeStamp : this.timeStamp
        });    
    }

    hash() {
        return txhash(new Buffer(this.toString()));
    }
}

class TxIn {
    constructor (prevOut, sig) {
        this.prevOut = prevOut;
        this.sig = sig;
    }
}

module.exports.Tx = Tx;
module.exports.TxOut = TxOut;
module.exports.TxIn = TxIn;