const OP = {
    PUSH: 0,
    DUP: 1,
    HASH160: 2,
    EQUAL_VERIFY: 3,
    CHECK_SIG: 4
};

module.exports.OP = OP;


module.exports.OP_PUSH = function OP_PUSH (value) {

    return { opcode: OP.PUSH, value: value };
};

module.exports.OP_DUP = function OP_DUP () {
    return { opcode: OP.DUP };
}

module.exports.OP_HASH160 = function OP_HASH160 () {
    return { opcode: OP.HASH160 };
}

module.exports.OP_EQUAL_VERIFY = function OP_EQUAL_VERIFY () {
    return { opcode: OP.EQUAL_VERIFY };
}

module.exports.OP_CHECK_SIG = function OP_CHECK_SIG () {
    return { opcode: OP.CHECK_SIG };
}