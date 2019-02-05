const beautify = require('json-beautify');

const { Block } = require('../block/block');
const { genesisBlock } = require('./genesis-block');
const { isValid, txhash } = require('../common/util');

/**
 * A chain which stores all valid blocks is Unique singleton type.
 */
let chainInstance = null;
class Chain {
    constructor (initBlock) {
        initBlock = initBlock || genesisBlock;
        this.version = 0.1;

        if (!(initBlock instanceof Block)) 
            throw "[Err] Chain > constructor should be initialized with a Block instance";

        if (chainInstance !== null) {
            // console.info("[Info] Chain have been already running, and A Yscoin-Chain requires uniqueness.");
            // console.info("[Info] This parameter genesis block will be desperated for preventing stablility issue");
            return chainInstance;
        }

        this.blockMap = [];

        this.genesisBlock = initBlock;
        this.prevBlock = null;
        this.lastBlock = null;
        this.height = 1;

        this.difficulty = 2;
        this.bits = 256;
        this.reward = 50;

        this.append(this.genesisBlock);

        chainInstance = this;

    }

    updateDifficulty(difficulty) {
        if (typeof difficulty === 'number') {
            this.difficulty = difficulty;
        }
    }

    append(block) {
        if (!(block instanceof Block))
            throw "[Err] Chain > append : a parameter only accept a instance of Block";
        
        if (this.hasBlock() && !isValid(block.getHash())) {
            throw "[Err] Chain > append : a given block is not valid";
        }

        this.incHeight();
        this.shiftL();

        this.lastBlock = block;

        this.connect2way(this.prevBlock, this.lastBlock);
        this.putToMap(this.lastBlock);
    }

    incHeight() {
        this.height += 1;
    }

    shiftL() {
        this.prevBlock = this.lastBlock;
    }

    connect2way(prev, next) {
        if (prev !== null) prev.setNext(next);
        next.setPrev(prev);
    }

    putToMap(block) {
        if (!(block instanceof Block))
            throw "[Err] Chain > putToMap : a parameter only accepts a instance of Block";
        
        this.blockMap[`${txhash(block.header)}`] = block;
    }

    hasBlock() {
        return !!this.lastBlock;
    }

    displayAllBlocks() {
        let prev = null;
        let cur = this.genesisBlock;

        console.log(`\n\n\n\n^^^^^^^^^^^^^^^^^^^^^ Ys Chain Board ^^^^^^^^^^^^^^^^^^^^^`);

        while(cur) {
            console.log('---------------------------∫∫∫----------------------------');
            console.log(`block : ${cur.getHash()}`);
            if (typeof txs !== undefined)
            for ( let tx of cur.txs) {
                console.log(`tx > ${beautify(tx, null, 2, 100)}`);
            }
            prev = cur;
            cur = cur.next;
        }

        console.log(`------------------------- Fin ----------------------------\n\n\n`);
    }
    
}


module.exports.Chain = Chain;