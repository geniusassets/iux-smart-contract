# Genius Smart Contracts

# IUX Token

IUX token has the following capabilities:

- Name: GeniuX
- Symbol: IUX
- Decimals: 18
- Maximum supply of 1,000,000,000 pre-minted. No more tokens can be issued
- Ownable: There is a single owner address that can be transferred
- Burnable: Use the burn or burnFrom function
- Pausable: The owner can pause the token transfers
- ForceTransfer: Owner can burn and remint the exact amount of tokens to a different address. Event emitted.

Deploy contract:
`npx hardhat run scripts/deploy-token.js --network matic`

# Run tests

Start a node:\
`npx hardhat node`

Run the tests:\
`npx hardhat test --network localhost`
