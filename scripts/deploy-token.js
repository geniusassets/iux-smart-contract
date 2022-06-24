// scripts/deploy.js
var exp = ethers.BigNumber.from("10").pow(18);

async function main () {
    // We get the contract to deploy
    const iuxContract = await ethers.getContractFactory('TIUX');
    console.log('Deploying IUX Token...');
    const iux = await iuxContract.deploy(ethers.BigNumber.from(1000000000).mul(exp));
    await iux.deployed();
    console.log('IUX deployed to:', iux.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });