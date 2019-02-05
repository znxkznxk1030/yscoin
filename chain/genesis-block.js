const { BlockHeader } = require('../block/block-header');
const { Block } = require('../block/block');

let genesisHeader = new BlockHeader({   nVersion:  0.1,
                        hasPrevBlock:  -1,
                        hasMarkleRoot:  '',
                        nTime:  0,
                        nBits:  0,
                        nNonce : 0  });

let genesisBlock = new Block(genesisHeader);

module.exports.genesisBlock = genesisBlock;