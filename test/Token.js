const chai = require("chai");
const { ethers } = require("hardhat");
const { solidity } = require("ethereum-waffle");
chai.use(solidity);
describe("Deploy token contract", function () {

  let tokenContract;
  let owner, wallet1, wallet2;
  var exp = ethers.BigNumber.from("10").pow(18);

  beforeEach('Deploy token, vesting, staking', async () => {
    tokenContract = await (await ethers.getContractFactory("IUX")).deploy(ethers.BigNumber.from(1000000).mul(exp));
    await tokenContract.deployed();
    [owner, wallet1, wallet2] = await ethers.getSigners();
    const transferToUserWallet = await tokenContract.connect(owner).transfer(wallet1.address, ethers.BigNumber.from(1000).mul(exp));      

    it("Should deploy the token contract", async function () {
      const totalSupply = await tokenContract.totalSupply();
      const ownerBalance = await tokenContract.balanceOf(owner.address);    
      const userBalance = await tokenContract.balanceOf(userWallet1.address);    

      chai.expect(ownerBalance.toString()).to.equal(ethers.BigNumber.from(998000).mul(exp)); 
      chai.expect(userBalance.toString()).to.equal(ethers.BigNumber.from(1000).mul(exp)); 
      chai.expect(totalSupply.toString()).to.equal(ethers.BigNumber.from(1000000).mul(exp)); 
    });  
  });
});
