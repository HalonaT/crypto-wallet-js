### How you can generate wallets? It's easy!
Copy and install this repository locally in a project.
```
npm install https://github.com/GemsGame/crypto-wallet-js.git --save
```

Or copy and install globally

```
npm install https://github.com/GemsGame/crypto-wallet-js.git --global
```
#### Bitcoin

```
cwj create-by-xpub --amount=1 --path=D:/bitcoin.json --xpub=xpub6CPm3dBibxZBhwuSbSPAsVV9gQeC8hvrJC8VV6zMDbicJCnevDnihF44tVejjqAzXNzFkWZN4B9jup6aGz5GJyJFVxoqTrJ1eZaSLQLuWuX

cwj create-xpub --seed="duck upon hybrid cycle sport release section enough attack brother useless talk"

cwj create-seed --network=bitcoin

cwj create-by-seed --amount=1 --network=bitcoin --path=D:/bitcoin.json --seed="duck upon hybrid cycle sport release section enough attack brother useless talk"

cwj create-by-seed --amount=1 --network=bitcoin --seed="duck upon hybrid cycle sport release section enough attack brother useless talk"

cwj create-by-seed --amount=1 --network=bitcoin --path=D:/bitcoin.json

cwj create-by-seed --amount=1 --network=bitcoin
```

#### Ethereum

```
cwj create --network=eth --amount=1 --path=D:/ethereum.json

cwj create-seed --network=eth

cwj create-by-seed --amount=5 --network=eth --path=D:/seed.json --seed="topple uniform buyer renew brother aisle bubble ten ankle rebuild usage firm"

cwj create-by-seed --amount=5 --network=eth --seed="topple uniform buyer renew brother aisle bubble ten ankle rebuild usage firm"

cwj create-by-seed --amount=5 --network=eth --path=D:/seed.json

cwj create-by-seed --amount=5 --network=eth

```

#### Tron
```
cwj create --network=tron --amount=1 --path=D:/tron.json

cwj create-seed --network=tron

cwj create-by-seed --amount=5 --network=tron --path=D:/seed.json --seed="topple uniform buyer renew brother aisle bubble ten ankle rebuild usage firm"

cwj create-by-seed --amount=5 --network=tron --seed="topple uniform buyer renew brother aisle bubble ten ankle rebuild usage firm"

cwj create-by-seed --amount=5 --network=tron --path=D:/seed.json

cwj create-by-seed --amount=5 --network=tron

```


#### Alternative use
You may to use the cwj library in the your project.
Look at the sample below 

```
const cwj = require('crypto-wallet-js');

const seed = cwj.ethereum.createSeed();
const result = cwj.ethereum.createWalletsBySeed(seed, 1);

```

The result is an object

```
{
  "seed": "random chat wasp patrol stereo invite lounge match viable ordinary erode frown",
  "wallets": [
    {
      "address": "0xAB0384e4304F02cB4B317E48E612319aFd3B0E18",
      "private": "0x4f0d24e36facfaa3ce61b61f01c6546bee4b0c6d0ce46c48f3e1e9a6e96eb253"
    }
  ]
}

```