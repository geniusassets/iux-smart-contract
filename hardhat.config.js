require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require('@openzeppelin/hardhat-upgrades');

const { POLYGON_MUMBAI_RPC_PROVIDER, PRIVATE_KEY, POLYGONSCAN_API_KEY } = process.env;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.14",
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    matic: {
      url: POLYGON_MUMBAI_RPC_PROVIDER,
      accounts: [`0x${PRIVATE_KEY}`],
      gasPrice: 60000000000,
      gas: 2100000
    }
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY,
 }
};