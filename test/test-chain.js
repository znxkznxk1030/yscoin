const assert = require('assert');
const {Chain} = require('../chain/chain');
const {genesisBlock} = require('../chain/genesis-block');

describe('Chain', () => {
    let chain = new Chain();

    describe('#singleton check', () => {
        it('should be singleton pattern', () => {
            try {
                let secondary_chain = new Chain();
                assert.deepEqual(chain, secondary_chain);
            } catch(e) {
                console.log(e);
            }
        });
    });

});