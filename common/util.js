const sha256 = require('sha256');
const secp256k1 = require('secp256k1');



Date.prototype.toTimestamp = function() {
    return Math.round(this.getTime() * 1000 / 1000);
};

/**
 * change Date to (int) unix timestamp
 * @param {Object}
 * @return {Number}
 * 
 * @public
 */
const dateToTimestamp = (date) => {
    return date instanceof Date? Math.round(date.getTime() * 1000 / 1000) : 0;
};

const nowTimestamp = () => {
    return (new Date(Date.now())).toTimestamp();
};

module.exports.nowTimestamp = nowTimestamp;

const txhash = (param) => {

    switch(typeof param) {
        case 'object':
            return sha256(Object.values(param).join(''), {asBytes: true});
        case 'string':
        default:
            return sha256(param, {asBytes: true});
    }
};

module.exports.txhash = txhash;

/**
 * hash with the object's all values
 * @param {Object} obj 
 * @return {String}
 * 
 * @public
 */
const hash = (param) => {

    switch(typeof param) {
        case 'object':
            return sha256(Object.values(param).join(''));
        case 'string':
        default:
            return sha256(param);
    }
};

module.exports.hash = hash;

/**
 * 
 * @param {Object} param
 * @return {String}
 * 
 * @public 
 */
const hash160 = (param) => {

};

module.exports.hash160 = hash160;

const sign = function (msg, privKey) {
    msg = Buffer.from(msg);
    return secp256k1.sign(msg, privKey);
};

module.exports.sign = sign;

const verify = function (msg, sigObj, pubKey) {
    msg = Buffer.from(msg);
    // console.log(`\n\n${sigObj.signature}`);
    return secp256k1.verify(msg, sigObj.signature, pubKey);
};

/**
 * 
 * @param {Object} hash 
 * @param {Number} diff 
 * @return {Boolean}
 * 
 * @public
 */
const isValid = (hash, diff) => {
    diff = diff || 2;
    return hash.slice(-diff) === "0".repeat(diff);
};


module.exports.dateToTimestamp = dateToTimestamp;
module.exports.isValid = isValid;
module.exports.verify = verify;