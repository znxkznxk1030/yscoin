
const { Tx, TxIn, TxOut } = require('../tx/tx');
const { Wallet } = require('../wallet/wallet');
const assert = require('assert');

describe('Tx', () => {
    let client1 = new Wallet();
    let client2 = new Wallet();

    let outputs = [];
    let inputs = [];

    outputs.push(new TxOut(10, client1.pubKey));
    inputs.push(new TxIn([], ''));

    let tx = new Tx(outputs, inputs);

    describe('#toString', () => {
        it('should be string',() => {
            assert.equal('string', typeof tx.toString());
        });
    });

    describe('#serialize', () => {
        it('should be type of Buffer', () => {
            assert.equal(true, tx.serialize() instanceof Buffer);
        });
    });

    describe('#hash', () => {
        it('should be a Bytes Array', () => {
            assert.equal(true, tx.hash() instanceof Array);            
        });    
    });
});

