const assert = require('assert');
const { randomBytes } = require('crypto');

const { Tx, TxIn, TxOut } = require('../tx/tx');
const { scriptSig, combineScript, p2pkh, interpret } = require('../script/script');
const { Wallet } = require('../wallet/wallet');
const { verify } = require('../common/util');
const { Chain } = require('../chain/chain');
const { Miner } = require('../miner/miner');

describe('Script', () => {
    let giver = new Wallet();
    let receiver = new Wallet();

    let mining = new Miner(giver);
    let block = mining.createBlock([]);

    let prevTx = block.txs[0];
    let prevSig = giver.sign(prevTx.hash());

    
    describe('# sign verify ', () => {
        it('should be true', () => {
            let msg = randomBytes(32);
            let sig = giver.sign(msg);
            assert.equal(true, verify(msg, sig, giver.pubKey));

        });
    });

    describe('# interpret', () => {
        it('should be true previous tx', () => {
            let sout = p2pkh(giver.pubKey);
            let sin = scriptSig(prevSig, giver.pubKey);
            let script = combineScript(sin, sout);
            
            let ret = interpret(script, prevTx, prevTx);

            assert.equal(true, ret.pop());
        });

        it('should be true current tx', () => {

            let txout = [new TxOut(5, giver.pubKey)];
            let txin = [new TxIn( prevTx,
                          scriptSig(
                            prevSig,
                            giver.pubKey
                          ))];

            let tx = new Tx(txout, txin);

            let script = combineScript(txin[0].sig, txout[0].scriptPubkey);
            let ret = interpret(script, prevTx, prevTx);

            assert.equal(true, ret.pop());
        });

    });
});