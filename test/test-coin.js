const { CoinView } = require('../coin/coin-view');
const { scriptSig, combineScript, p2pkh, interpret } = require('../script/script');
const { Wallet } = require('../wallet/wallet');
const { verify } = require('../common/util');
const { Chain } = require('../chain/chain');
const { Miner } = require('../miner/miner');

const assert = require('assert');

describe('CoinView', () => {
    let coinView = new CoinView();

    let client1 = new Wallet('client1');
    let client2 = new Wallet('client2');
    let client3 = new Wallet('client3');

    let miner1 = new Miner(client1);
    let miner2 = new Miner(client2);
    let miner3 = new Miner(client3);

    before(() => {
        miner1.createBlock();
        miner2.createBlock();
        miner3.createBlock();
    });

    describe('#', () => {
        
    });

    
});