const assert = require('assert');
const { Wallet } = require('../wallet/wallet');
const { randomBytes } = require('crypto');
const secp256k1 = require('secp256k1');


describe('Wallet', () => {
    describe('#generate private key', () => {
        it('should be deciphered only by private key', () => {
            let wallet = new Wallet();
            let msg = randomBytes(32);
            let sigObj = wallet.sign(msg);

            assert.equal(true, secp256k1.verify(msg, sigObj.signature, wallet.pubKey));

            let random = randomBytes(32);
            let pubkey = secp256k1.publicKeyCreate(random);

            assert.notEqual(true, secp256k1.verify(msg, sigObj.signature, pubkey));
        });
    });
});