const { Chain } = require('../chain/chain');
const { Block } = require('../block/block');
const { BlockHeader } = require('../block/block-header');
const { isValid} = require('../common/util');
const { Wallet } = require('../wallet/wallet');
const { Tx, TxOut } = require('../tx/tx');
const { CoinView } = require('../coin/coin-view');
const { nowTimestamp } = require('../common/util');
const { p2pkh } = require('../script/script');

class Miner {

    constructor (wallet) {
        if (typeof wallet === 'undefined' || wallet === null || !wallet instanceof Wallet)
            throw `[TYPE ERR] Miner : constructor's param should be instance of Wallet`;

        this.wallet = wallet;
        this.chain = new Chain();
        this.initMeterials();
        this.coinRef = new CoinView();
    }

    initMeterials() {
        this.nonce = 0;

        this.version = this.chain.version;
        this.diff = this.chain.difficulty;
    }

    createBlock(txs = []) {

        txs = [this._buildCoinbaseTx()].concat(txs);
        this._buildBlockHeader(txs);
        this._run();

        if(isValid(this.header.getHash())) {

            console.log(`------------------------\nMining Success!! -> wallet owner : ${this.wallet.nickname},  ${this.chain.reward} ys\n------------------------\n`);

            this.commitTxs(txs);

            let newBlock = new Block(this.header, txs);
            this.chain.append(newBlock);

            return newBlock;
        }

        return 'fail to make new block';
    }

    commitTxs (txs) {
        for (let tx of txs) {
            console.log(`${this.wallet.nickname}'s Mine is commiting Tx`);
            this.coinRef.updateCoins(tx);
        }
    }

    _run () {
        while(true) {
            this._updateBlockHeader();

            if (isValid(this.header.getHash())) {
                return;
            }
        }
    }

    _buildCoinbaseTx() {
        let outputs = [new TxOut(this.chain.reward, this.wallet.pubKey)];
        let coinbaseTx = new Tx(outputs);

        return coinbaseTx;
    }

    _buildBlockHeader(txs) {
        this.header =  new BlockHeader({
            nVersion: this.chain.version,
            hasPrevBlock: null,
            hasMarkleRoot: txs, // TODO : make MERKLE TREE hash
            nBits: this.chain.bits
        });
    }

    _updateBlockHeader() {
        if (typeof this.header === 'undefined' || ! (this.header instanceof BlockHeader))
            throw `[ERR] Miner : block header is wrong -> ${this.header}`;

        this.header.nTime = nowTimestamp();
        this.header.nNonce = this.nonce++;
    }

}

module.exports.Miner = Miner;