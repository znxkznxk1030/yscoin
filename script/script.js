const { txhash, verify } = require('../common/util');
const { OP,
        OP_PUSH,
        OP_DUP,
        OP_HASH160,
        OP_EQUAL_VERIFY,
        OP_CHECK_SIG } = require('./types');


module.exports.interpret = function interpret (script, tx, txPrevOutIndex) {
    let stack = [];

    for(op of script) {
        switch (op.opcode) {
            case OP.PUSH :
                stack.push(op.value);
            break;

            case OP.DUP:
                stack.push(stack[stack.length - 1]);
            break;

            case OP.HASH160:
                stack.push(txhash(stack.pop()));
            break; 

            case OP.EQUAL_VERIFY:
                let tmpA = stack.pop();
                let tmpB = stack.pop();

                if (isNotEqual(tmpA, tmpB))
                    throw `not valid script`;
            break;

            case OP.CHECK_SIG:
                let pubKey = stack.pop();
                let sigObj = stack.pop();
                stack.push(verify(tx.hash(), sigObj, pubKey));
            break;

            default:
            throw `unvalid op code ${op.opcode}`;
        }

    }

    return stack;
};

let isNotEqual = (aBuffer, bBuffer) => {
    for(let i = 0; i < aBuffer.length; i++) {
        if(aBuffer[i] !== bBuffer[i]) return true;
    }
    return false;
};

module.exports.p2pkh =  function p2pkh(recipientPubKey) {
    const recipientPubKeyHash = txhash(recipientPubKey); // TODO: FIX
    return [OP_DUP(), OP_HASH160(), OP_PUSH(recipientPubKeyHash), OP_EQUAL_VERIFY(), OP_CHECK_SIG()];
};

module.exports.scriptSig = function scriptSig(signature, pubKey) {
    return [OP_PUSH(signature), OP_PUSH(pubKey)];
};

module.exports.combineScript =  function combineScript(scriptSig, p2pkh) {
    return [].concat(scriptSig, p2pkh);
};