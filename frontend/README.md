# Recruitment Test

Welcome to **swap dapp**, a decentralized application (dApp) that enables seamless token swaps through an intuitive user interface.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Token Addresses](#token-addresses)
- [Features](#features)
- [License](#license)

## Installation

Follow these steps to set up and run the project locally:

1. **Clone the repository**:
   Clone the repository from GitHub to your local machine by running the following command:
   ````bash
   git clone https://github.com/Anwar-Khann/recruitment_test
    ```
   Navigate to the main project folder: Change to the directory where the project was cloned:
   ````

- cd frontend
  Verify the contents of the folder: Use ls to list the files in the directory and confirm you're in the correct folder:

- Install project dependencies:
  Run the following command to install all the necessary Node.js packages:

```
npm install || yarn install
```

Run the project locally: Start the project by running the following command:

- also make sure to run the server file as well have used the express.js because of ease(low complexity tasks on back-end).

The project should now be live at http://localhost:3000/ (or another port, depending on your configuration). Open this URL in your web browser to access the dApp.

# Usage

Once the project is running, follow these steps to perform a token swap:

Navigate to the dApp: Open your browser and visit http://localhost:3000/ (or the appropriate URL if configured differently).

Choose token addresses: The dApp supports two tokens for swapping. You can use either one of the following token addresses for the transaction:

- Token 1 Address: 0x832262D88e6C02A31C7C267B6536cFafe7Fdf3E8
- Token 2 Address: 0x174F4259E885EBaFcDc6c09f38a493c4CA90b85e
- Dex contract : 0xa886B5737FBEB5120EadB5B81Ba2e89d14Da08bD
- private key : 3e585ba774b0f6251acea12df5597cc27d8a96a7ef5d1b3a11ed75dd4d6271f7

- liquidity is already added with uniswapV2Router;

## Enter swap details:

- Amount to swap: Enter the amount of the selected token you wish to swap.
- Source token address: Choose one of the above token addresses as the source.
- Destination token address: Choose the other token as the destination.

Confirm the transaction: Once satisfied, click "Swap" to confirm the transaction. The dApp will execute the swap via the Uniswap V2 router

# Features

User-friendly interface: Swap tokens through a simple and intuitive UI.
Multiple token support: Swap between two supported token pairs.
