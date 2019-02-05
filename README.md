# YS coin

- A Simple block-chain project contains POW (proof of work) mechanism, Transaction exchange algorithm(use secp256k1)


## Install

if you don't have npm (node package manager), should install npm first.


- install a global dependency
- - mocha (a test library for node.js)

```bash
npm -g install mocha 
```

- install local dependencies

``` bash
npm install
```
or
``` bash
npm i
```


## Test

``` bash
npm test
```


## Run

``` bash
npm start
```

## Dependencies

``` json
{
    "buffer": "^5.2.1",
    "buffer-from": "^1.1.1",
    "crypto": "^1.0.1",
    "ripemd160": "^2.0.2",
    "secp256k1": "^3.5.2",
    "sha256": "^0.2.0"
}
```