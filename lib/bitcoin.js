const bjs = require("bitcoinjs-lib");
const ecc = require("tiny-secp256k1");
const { BIP32Factory } = require("bip32");
const bip39 = require("bip39");

const bip32 = BIP32Factory(ecc);

const createWalletsByXpub = (count, xpub) => {
  const wallets = [];

  for (let i = 0; i < count; i++) {
    const { address } = bjs.payments.p2pkh({
      pubkey: bip32.fromBase58(xpub, bjs.networks.bitcoin).derive(0).derive(i)
        .publicKey,
      network: bjs.networks.bitcoin,
    });
    wallets.push(address);
  }


  const result = {
    wallets
  }

  return result;
};


const createMnemonic = () => {
  return bip39.generateMnemonic();
}

const createSeed = (mnemonic) => {
  return bip39.mnemonicToSeedSync(mnemonic);
}

const createXpub = (mnemonic) => {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const node = bip32.fromSeed(seed);
  const strng = node.neutered().toBase58();
  return strng;
}

const createWalletsBySeed = (seed, mnemonic, count) => {
  const network = bjs.networks.bitcoin;
  let root = bip32.fromSeed(seed, network);
  const wallets = [];

  for (let i = 0; i < count; i++) {

    const child = root.derivePath("m/44'/0'/0'/0/" + i);

    let btcAddress = bjs.payments.p2pkh({
      pubkey: child.publicKey,
      network: network,
    }).address;


    wallets.push(
      { address: btcAddress, privateKey: child.toWIF() }
    )


  }

  const result = {
    seed: mnemonic,
    wallets
  }
  
  return result;
};

module.exports = {
  createWalletsByXpub,
  createWalletsBySeed,
  createMnemonic,
  createSeed,
  createXpub
};
