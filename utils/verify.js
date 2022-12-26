const { run } = require("hardhat");

const verify = async (contractAddress, args) => {
  console.log("veryfying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    if (error.message.includes("Contract source code already verified")) {
      console.log("Contract source code already verified");
    }
    console.log(error);
  }
};

module.exports = {
  verify,
};
