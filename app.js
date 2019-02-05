const { Wallet } = require('./wallet/wallet');
const { Chain } = require('./chain/chain');
const { Miner } = require('./miner/miner');


let client1 = new Wallet('tiger');
let client2 = new Wallet('lion');
let client3 = new Wallet('penguin');

let miner_clt1 = new Miner(client1);
let miner_clt2 = new Miner(client2);
let miner_clt3 = new Miner(client3);


miner_clt1.createBlock();
miner_clt2.createBlock();

console.log(`~~~~~~~~~~~~~~~~~~~~BugetBoard~~~~~~~~~~~~~~~~~~~~~~~~`);
client1.getBudget();
client2.getBudget();
client3.getBudget();
console.log(`~~~~~~~~~~~~~~~~~~~~BugetBoard~~~~~~~~~~~~~~~~~~~~~~~~`);

console.log(`!!!!!!!!!!!Tx Create : [[${client2.nickname} -> ${client3.nickname} : 50]]!!!!!!!!!!!`);
let tx = client2.makeTx(client3);

console.log(`!!!!!!!!!!!Tx Create : [[${client1.nickname} -> ${client3.nickname} : 50]]!!!!!!!!!!!`);
let tx2 = client1.makeTx(client3);



miner_clt1.createBlock([tx, tx2]);

console.log(`~~~~~~~~~~~~~~~~~~~~BugetBoard~~~~~~~~~~~~~~~~~~~~~~~~`);
client1.getBudget();
client2.getBudget();
client3.getBudget();
console.log(`~~~~~~~~~~~~~~~~~~~~BugetBoard~~~~~~~~~~~~~~~~~~~~~~~~`);



let chain = new Chain();
// chain.displayAllBlocks();