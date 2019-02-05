const { BlockHeader } = require('./block-header');

/**
 * a Block Class which is contained chain
 */
class Block {
    constructor (header, txs = []) {
        this.header = header;   // TODO: fix to _makeHeader, cannot find issue why BlockHeader is not compiled at this time.
        this.txs = txs;
        this.prev = null;
        this.next = null;
    }

    // TODO : fix
    _makeHeader (header) {
        if (header instanceof BlockHeader) {
            return header;
        } else {
            return new BlockHeader(header);
        }
    }   

    getHash () {
        return this.header.getHash();
    }

    setNext (block) {
        this.next = block;
    }

    setPrev (block) {
        this.prev = block;
    }
}

module.exports.Block = Block;