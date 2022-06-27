# Genius Smart Contracts

# IUX Token

IUX token has the following capabilities:

- Name: GeniuX
- Symbol: IUX
- Decimals: 18
- Maximum supply of 1,000,000,000 pre-minted. No more tokens can be issued.
- Ownable: There is a single owner address that can be transferred.
- Burnable: Use the _burn_ or _burnFrom_ function
- Pausable: The owner can _pause_ or _resume_ the token transfers
- ForceTransfer: Owner can _burn_ and _remint_ the exact amount of tokens to a different address. Event emitted _ForceTransfer_
- The smart-contract is deployed on Polygon network.
- The token also features _IAntisnipe_ functionality.

Deploy contract:
`npx hardhat run scripts/deploy-token.js --network matic`

# Run tests

Start a node:\
`npx hardhat node`

Run the tests:\
`npx hardhat test --network localhost`
