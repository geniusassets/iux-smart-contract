## Genius Smart Contracts

The ecosystem is underpinned by GeniuX, a utility token based on the Polygon standard. It will be used to support the tokenization of real-world assets, with a wide range of sectors covered including real estate, transportation, sports and arts.\
\
Digital assets marketplace Genius Assets is a new project allowing decentralised investments in non-crypto assets. 
Through tokenization, Genius Assets will make it possible for ecosystem participants to hold digital shares in properties and other assets via fractional ownership and receive a corresponding percentage of the income those assets generate. \
The aim of the project is to make the token economy a viable option for long-term holders seeking regular revenue. While many of the investment opportunities available via the GeniuX token will be traditional, the possibility of participating in ICOs and NFT releases means the digital assets space will not be overlooked.\
\
A debit card, more real estate projects, an NFT marketplace and further DeFi integration will follow in 2023. The project founders ultimately hope to build the largest marketplace for high-value digital and physical assets on the blockchain.


## IUX Token Specs

IUX token has the following capabilities:

- Name: GeniuX
- Symbol: IUX
- Decimals: 18
- Maximum supply of 1,000,000,000 pre-minted. No more tokens can be issued.
- Ownable: There is a single owner address that can be transferred.
- Burnable: Use the _burn_ or _burnFrom_ function
- ForceTransfer: Owner can _burn_ and _remint_ the exact amount of tokens to a different address. Event emitted _ForceTransfer_
- The smart-contract is deployed on Polygon network.
- The token also features _IAntisnipe_ functionality.

Deploy contract:\
`npx hardhat run scripts/deploy-token.js --network matic`

# Run tests

Start a node:\
`npx hardhat node`

Run the tests:\
`npx hardhat test --network localhost`
