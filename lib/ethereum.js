const ethers = require('ethers');

const createRandomWallets = (amount) => {
  let wallets = [];
  for (let i = 0; i < amount; i++) {
    const { address, privateKey } = ethers.Wallet.createRandom();

    const wallet = {
      address,
      privateKey
    };

    wallets.push(wallet);
  }

  const result = {
    wallets
  }
  return result;
}

const createSeed = () => {
  return ethers.Mnemonic.entropyToPhrase(ethers.randomBytes(16))
}

const createWalletsBySeed = async (seed, amount) => {
  const mnemonic = ethers.Mnemonic.fromPhrase(seed);

  let wallets = [];
  for (let i = 0; i < amount; i++) {
    const _wallet = ethers.HDNodeWallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${i}`);
    const address = _wallet.address;
    const private = _wallet.privateKey;

    const wallet = {
      address,
      private
    }

    wallets.push(wallet);
  }

  const result = {
    seed,
    wallets
  }
  return result;
}

module.exports = { createRandomWallets, createSeed, createWalletsBySeed };