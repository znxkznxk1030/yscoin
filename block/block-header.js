const { hash, nowTimestamp } = require('../common/util');
/**
 * block header for remembering
 */
class BlockHeader {
    
    constructor ({  nVersion = 1.0,
                    hasPrevBlock = '',
                    hasMarkleRoot = '',
                    nTime = nowTimestamp(),
                    nBits = 256,
                    nNonce = 0 }) 
    {
        this.nVersion = nVersion || null;
        this.hasPrevBlock = hasPrevBlock || null;
        this.hasMarkleRoot = hasMarkleRoot || null;
        this.nTime = nTime;
        this.nBits = nBits || 0;
        this.nNonce = nNonce;
    }

    getTime () {
        return this.nTime;
    }

    getHash() {
        return hash(this);
    }
}

module.exports.BlockHeader = BlockHeader;


