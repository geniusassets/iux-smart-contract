const chai = require("chai");
const { ethers } = require("hardhat");
const { solidity } = require("ethereum-waffle");
chai.use(solidity);
describe("Deploy token contract", function () {

  let tokenContract;
  let owner, wallet1, wallet2, wallet3;
  var exp = ethers.BigNumber.from("10").pow(18);

  beforeEach('Deploy token contract', async () => {
    tokenContract = await (await ethers.getContractFactory("IUX")).deploy(ethers.BigNumber.from(1000000).mul(exp));
    await tokenContract.deployed();
    [owner, wallet1, wallet2, wallet3] = await ethers.getSigners();    
  });

  it("Test the transfer and check balance", async function () { 
    const transferToUserWallet = await tokenContract.connect(owner).transfer(wallet1.address, ethers.BigNumber.from(1000).mul(exp));  
    const totalSupply = await tokenContract.totalSupply();
    const ownerBalance = await tokenContract.balanceOf(owner.address);    
    const userBalance = await tokenContract.balanceOf(wallet1.address); 

    chai.expect(ownerBalance.toString()).to.equal(ethers.BigNumber.from(999000).mul(exp)); 
    chai.expect(userBalance.toString()).to.equal(ethers.BigNumber.from(1000).mul(exp)); 
    chai.expect(totalSupply.toString()).to.equal(ethers.BigNumber.from(1000000).mul(exp)); 
  });

  it("Test the approve, transferFrom and remove approval", async function () { 
    const transferToUserWallet = await tokenContract.connect(owner).transfer(wallet1.address, ethers.BigNumber.from(1000).mul(exp));  
    chai.expect((await tokenContract.balanceOf(wallet1.address)).toString()).to.equal(ethers.BigNumber.from(1000).mul(exp)); 

    const approveTransfer = await tokenContract.connect(wallet1).approve(wallet2.address, ethers.BigNumber.from(200).mul(exp));  
    chai.expect((await tokenContract.allowance(wallet1.address, wallet2.address)).toString()).to.equal(ethers.BigNumber.from(200).mul(exp)); 

    chai.expect((await tokenContract.balanceOf(wallet3.address)).toString()).to.equal(ethers.BigNumber.from(0).mul(exp)); 
    const transferFrom = await tokenContract.connect(wallet2).transferFrom(wallet1.address, wallet3.address, ethers.BigNumber.from(120).mul(exp));  
    chai.expect((await tokenContract.balanceOf(wallet3.address)).toString()).to.equal(ethers.BigNumber.from(120).mul(exp)); 
    chai.expect((await tokenContract.allowance(wallet1.address, wallet2.address)).toString()).to.equal(ethers.BigNumber.from(80).mul(exp));     

    const decreaseAllowance = await tokenContract.connect(wallet1).decreaseAllowance(wallet2.address, ethers.BigNumber.from(50).mul(exp));  
    chai.expect((await tokenContract.allowance(wallet1.address, wallet2.address)).toString()).to.equal(ethers.BigNumber.from(30).mul(exp));     

    await chai.expect
      (tokenContract
        .connect(wallet2)
        .transferFrom(wallet1.address, wallet3.address, ethers.BigNumber.from(90).mul(exp))
      ).to.be.revertedWith(
      "ERC20: insufficient allowance");
  });  

  it("Test the burn of token", async function () {
    const transferToUserWallet = await tokenContract.connect(owner).transfer(wallet1.address, ethers.BigNumber.from(1000).mul(exp));  
    const burnTokens = await tokenContract.connect(wallet1).burn(ethers.BigNumber.from(500).mul(exp));  

    const totalSupply = await tokenContract.totalSupply();
    const userBalance = await tokenContract.balanceOf(wallet1.address);    

    chai.expect(userBalance.toString()).to.equal(ethers.BigNumber.from(500).mul(exp)); 
    chai.expect(totalSupply.toString()).to.equal(ethers.BigNumber.from(999500).mul(exp)); 
  });

  it("Test unauthorized force transfer", async function () {
    const transferToUserWallet = await tokenContract.connect(owner).transfer(wallet1.address, ethers.BigNumber.from(1000).mul(exp));  
    await chai.expect
      (tokenContract
      .connect(wallet1)
      .forceTransfer(wallet1.address, wallet2.address, ethers.BigNumber.from(500).mul(exp), ethers.utils.formatBytes32String("0x"))).to.be.revertedWith(
      "Ownable: caller is not the owner");

  });  

  it("Test force transfer from owner", async function () {
    const transferToUserWallet = await tokenContract.connect(owner).transfer(wallet1.address, ethers.BigNumber.from(1000).mul(exp));  
    await tokenContract
      .connect(owner)
      .forceTransfer(wallet1.address, wallet2.address, ethers.BigNumber.from(500).mul(exp), ethers.utils.formatBytes32String("0x"));

    const totalSupply = await tokenContract.totalSupply();
    const wallet1Balance = await tokenContract.balanceOf(wallet1.address);    
    const wallet2Balance = await tokenContract.balanceOf(wallet2.address);    

    chai.expect(wallet1Balance.toString()).to.equal(ethers.BigNumber.from(500).mul(exp)); 
    chai.expect(wallet2Balance.toString()).to.equal(ethers.BigNumber.from(500).mul(exp));     
  });    

});
