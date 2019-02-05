
const assert = require('assert');

const { dateToTimestamp, hash } = require('../common/util');

describe('Util', () => {
    describe('#dateToTimestamp', () => {
        it('should be number', () => {
            assert.equal('number', typeof dateToTimestamp(new Date()));
        });

        it('should be integer', () => {
            let timestamp = (new Date()).toTimestamp();
            assert.equal(timestamp / 10 * 10, timestamp);
        });

        it('should be same', () => {
            let date = new Date();
            assert.equal(date.toTimestamp(), dateToTimestamp(date));
        });
    });
    
    describe('#hash', () => {
        let tmpObj = {
            a : '1',
            b : 2,
            c : '3'
        };

        it('should be string', () => {
            assert.equal('string', typeof hash(tmpObj));
        });
    });

});
