const { ethers, network } = require("hardhat");
const fs = require("fs");

const FRONTEND_ADDRESS_PATH =
  "../next-js-lottery/constants/contractAddresses.json";
const FRONTEND_ABI_PATH = "../next-js-lottery/constants/abi.json";

module.exports = async function () {
  if (process.env.UPDATE_FRONTEND) {
    console.log("Updating frontend...");
    updateContracAddresses();
    updateAbi();
  }
};

async function updateAbi() {
  const raffle = await ethers.getContract("Raffle");
  fs.writeFileSync(
    FRONTEND_ABI_PATH,
    raffle.interface.format(ethers.utils.FormatTypes.json)
  );
}

async function updateContracAddresses() {
  const raffle = await ethers.getContract("Raffle");
  const chainId = network.config.chainId.toString();
  const currentAddresses = JSON.parse(
    fs.readFileSync(FRONTEND_ADDRESS_PATH, "utf8")
  );
  if (chainId in currentAddresses) {
    if (!currentAddresses[chainId].includes(raffle.address)) {
      currentAddresses[chainId].push(raffle.address);
    }
  } else {
    currentAddresses[chainId] = [raffle.address];
  }
  fs.writeFileSync(FRONTEND_ADDRESS_PATH, JSON.stringify(currentAddresses));
}

module.exports.tags = ["all", "frontend"];
