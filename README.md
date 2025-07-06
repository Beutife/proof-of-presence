# Proof of Presence (PoP) dApp

Proof of Presence (PoP) is a decentralized application (dApp) built on Ethereum, enabling users to record and verify their presence at events using blockchain technology. This project leverages Remix IDE for smart contract development and a React-based frontend with RainbowKit and Wagmi for seamless wallet integration and user interaction.

## Table of Contents
- [Overview](#overview)
- [Smart Contract Development](#smart-contract-development)
- [Frontend Setup](#frontend-setup)
- [Installation and Usage](#installation-and-usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Overview
The PoP dApp allows users to submit proof of their presence at an event via a message stored on-chain. The smart contract, deployed using Remix IDE, handles message storage and verification, while the frontend, built with React, provides a user-friendly interface with wallet connectivity via RainbowKit and Wagmi.

## Smart Contract Development
The PoP smart contract was developed and deployed using **Remix IDE**, a powerful tool for Ethereum smart contract development. Key steps included:
1. **Writing the Contract**: Created a Solidity smart contract (`Presence.sol`) to store user messages and timestamps on the Ethereum blockchain.
   ```solidity
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;
   contract ProofOfPresence {
       struct Message {
           address sender;
           uint256 timestamp;
           string content;
       }

    Message[] public messages;

    event MessageLogged(address indexed sender, uint256 timestamp, string content);

    function logMessage(string calldata _content) external {
        messages.push(Message(msg.sender, block.timestamp, _content));
        emit MessageLogged(msg.sender, block.timestamp, _content);
    }

    function getMessages() external view returns (address[] memory, uint256[] memory, string[] memory) {
        address[] memory senders = new address[](messages.length);
        uint256[] memory timestamps = new uint256[](messages.length);
        string[] memory contents = new string[](messages.length);

        for (uint256 i = 0; i < messages.length; i++) {
            senders[i] = messages[i].sender;
            timestamps[i] = messages[i].timestamp;
            contents[i] = messages[i].content;
        }

        return (senders, timestamps, contents);
    }
} 
```
```

2. **Testing**: Used Remix IDE’s testing environment to simulate contract interactions, ensuring accurate message storage and retrieval.

3. **Deployment**: Deployed the contract to a testnet Sepolia via Remix IDE’s integrated deployment tools, using MetaMask for transaction signing.

4. **Debugging**: Leveraged Remix IDE’s debugging tools to troubleshoot and optimize gas usage.

# Frontend Setup

The frontend was developed in VS Code using React.js for a responsive user interface. 

### Key components include:

1. **Wallet Integration**: Integrated RainbowKit for wallet connectivity and Wagmi for interacting with the smart contract’s recordPresence and getPresence functions.

2. **UI Components**: Designed a form for users to input their presence message, with Tailwind CSS for styling.

3. **Contract Interaction**: Used Wagmi hooks to call the smart contract, enabling users to submit messages and view their recorded presence.

# Installation and Usage

### Clone the Repository:
```
git clone https://github.com/Beutife/proof-of-presence.git
cd proof-of-presence
```
### Install Dependencies:
```
npm install
```
### Deploy the Smart Contract:

1. Open Remix IDE (https://remix.ethereum.org).
2. Import Presence.sol from the contracts/ folder.
3. Compile and deploy to a testnet (e.g., Sepolia) using Remix IDE.

#### Run the Frontend:
```
npm start
```
## Technologies Used

1. Smart Contract: Solidity, Remix IDE, Ethereum (Sepolia Testnet)
2. Frontend: React.js, RainbowKit, Wagmi, Tailwind CSS
3. Tools: VS Code, GitHub, Markdown
4. Wallet: MetaMask

## Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a branch (```git checkout -b feature/update-docs````).
3. Commit changes (```git commit -m "Updated README with new section"```).
4. Submit a pull request.

## License
MIT License (LICENSE)






