const assert = require('assert');
const { BlockHeader } = require('../block/block-header');
const { Block } = require('../block/block');
const { hash } = require('../common/util');

describe('BlockHeader', () => {
    describe('#setNull', () => {

    });
    
    describe('#instanceof', () => {
        let init ={ nVersion: '1',
                    hasPrevBlock: '2',
                    hasMarkleRoot: '3',
                    nTime: '4',
                    nBits: 5,
                    nNonce: '6' };
        
        let bh = new BlockHeader(init);

        it('should be instanceof BlockHeader', () => {
            assert.equal(true, bh instanceof BlockHeader);
        });

    });
});

describe('Block', () => {
    describe('#getHash', () => {
        it('should have same hash value', () => {
            assert.equal(block.getHash(), hash(initStream));
        });
    });

    describe('#' , () => {

    });
});

const initStream = { nVersion: '1',
                     hasPrevBlock: '2',
                     hasMarkleRoot: '3',
                     nTime: '4',
                     nBits: 5,
                     nNonce: '6' };


const blockHeader = new BlockHeader(initStream);
const block = new Block(blockHeader);