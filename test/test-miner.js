const { Tx, TxIn, TxOut } = require('../tx/tx');
const { Wallet } = require('../wallet/wallet');
const { Miner } = require('../miner/miner');
const { Chain } = require('../chain/chain');
const assert = require('assert');

describe('Miner', () => {
    let chain = new Chain();

    let miner1 = new Miner(new Wallet());

    describe('#create new block', () => {
       it('should increase chain\'s height', () => {
            let height = chain.height;
            miner1.createBlock([]);
            assert.equal(height + 1, chain.height);
       }); 
    });

});
