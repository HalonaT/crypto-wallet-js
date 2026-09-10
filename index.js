#!/usr/bin/env node

const yargs = require("yargs");
const package = require("./package.json");
const ethereum = require("./lib/ethereum.js");
const tron = require("./lib/tron.js");
const bitcoin = require("./lib/bitcoin.js");
const fs = require("fs");

yargs.version(package.version);
yargs.command({
  command: "create",
  describe: "main command for wallet creation",
  builder: {
    network: {
      type: "string",
      demandOption: true,
      describe: "Networks: eth, bitcoin, tron",
    },
    amount: {
      type: "number",
      demandOption: true,
      describe: "Amount of wallets, 1 for example",
    },
    path: {
      type: "string",
      demandOption: false,
      describe: "D:/file.txt",
    },
  },
  handler({ network, amount, path }) {
    if (network === "eth") {
      const result = ethereum.createRandomWallets(amount);

      if (path) {
        fs.writeFile(path, JSON.stringify(result), (error) => {
          if (error) throw error;
        });
      } else {
        console.log(result);
      }

    }
    if (network === "tron") {

      if (path) {
        tron.createRandomWallets(amount).then((wallets) => {
          fs.writeFile(path, wallets, (error) => {
            if (error) throw error;
          });
        });
      } else {
        console.log(wallets)
      }
    }
  },
});

yargs.command({
  command: "create-by-seed",
  describe: "",
  builder: {
    network: {
      type: "string",
      demandOption: false,
      describe: "Networks: eth, bitcoin, tron",
    },
    amount: {
      type: "number",
      demandOption: false,
      describe: "Amount of wallets, 1 for example",
    },
    path: {
      type: "string",
      demandOption: false,
      describe: "D:/file.txt",
    },
    seed: {
      type: "string",
      demandOption: false,
      describe: "",
    },
  },

  async handler({ network, amount, path, seed }) {
    if (network === "eth" || network === "ethereum") {
      if (!seed) seed = ethereum.createSeed();
      const result = await ethereum.createWalletsBySeed(seed, amount);

      if (path) {
        fs.writeFile(path, JSON.stringify(result), (error) => {
          if (error) throw error;
        });
      } else {
        console.log(result);
      }

    }

    if (network === "bitcoin" || network === "btc") {

      if (!seed) {
        const mnemonic = bitcoin.createMnemonic();
        const _seed = bitcoin.createSeed(mnemonic);
        const result = bitcoin.createWalletsBySeed(_seed, mnemonic, amount);

        if (path) {
          fs.writeFile(path, JSON.stringify(result), (error) => {
            if (error) throw error;
          });
        } else {
          console.log(result)
        }

      } else {
        const _seed = bitcoin.createSeed(seed);
        const result = bitcoin.createWalletsBySeed(_seed, seed, amount);

        if (path) {
          fs.writeFile(path, JSON.stringify(result), (error) => {
            if (error) throw error;
          });
        } else {
          console.log(result)
        }
      }

    }

    if (network === 'tron') {
      if (!seed) {
        const mnemonic = tron.createMnemonic();
        const _seed = tron.createSeed(mnemonic);
        const result = tron.createWalletsBySeed(_seed, mnemonic, amount);

        if (path) {
          fs.writeFile(path, JSON.stringify(result), (error) => {
            if (error) throw error;
          });
        } else {
          console.log(result)
        }

      } else {

        const _seed = tron.createSeed(seed);
        const result = tron.createWalletsBySeed(_seed, seed, amount);

        if (path) {
          fs.writeFile(path, JSON.stringify(result), (error) => {
            if (error) throw error;
          });
        } else {
          console.log(result);
        }
      }
    }


  },
});

yargs.command({
  command: "create-seed",
  describe: "The command create a new 12 words phrase",
  handler({ network }) {
    if (network === "btc" || network === "bitcoin") {
      const seed = ethereum.createSeed();
      console.log(seed);
    }

    if (network === "eth" || network === "ethereum") {
      const seed = ethereum.createSeed();
      console.log(seed);
    }

    if (network === "tron") {
      const seed = tron.createMnemonic()
      console.log(seed);
    }
  },
});

yargs.command({
  command: "create-by-xpub",
  describe: "",
  builder: {
    amount: {
      type: "number",
      demandOption: false,
      describe: "Amount of wallets, 1 for example",
    },
    path: {
      type: "string",
      demandOption: false,
      describe: "D:/file.txt",
    },
    xpub: {
      type: "string",
      demandOption: true,
      describe: "bitcoin xpub",
    },
  },

  async handler({ amount, xpub, path }) {
    const result = bitcoin.createWalletsByXpub(amount, xpub);
    if (path) {
      fs.writeFile(path, JSON.stringify(result), (error) => {
        if (error) throw error;
      });
    } else {
      console.log(result)
    }
  },
});

yargs.command({
  command: "create-by-zpub",
  describe: "",
  builder: {
    amount: {
      type: "number",
      demandOption: false,
      describe: "Amount of wallets, 1 for example",
    },
    path: {
      type: "string",
      demandOption: false,
      describe: "D:/file.txt",
    },
    zpub: {
      type: "string",
      demandOption: true,
      describe: "bitcoin zpub",
    },
  },

  async handler({ amount, zpub, path }) {
    const result = bitcoin.createWalletsByXpub(amount, zpub);

    if (path) {
      fs.writeFile(path, JSON.stringify(result), (error) => {
        if (error) throw error;
      });
    } else {
      console.log(result);
    }
  },
});

yargs.command({
  command: "create-xpub",
  describe: "",
  builder: {
    seed: {
      type: "string",
      demandOption: true,
      describe: "seed",
    },
  },

  async handler({ seed }) {
    const result = bitcoin.createXpub(seed);
    console.log(result);
  },
});
yargs.parse();


module.exports = { ethereum, tron, bitcoin }