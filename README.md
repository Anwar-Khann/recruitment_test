# Recruitment Test

Welcome to **swap dapp**, a decentralized application (dApp) that enables seamless token swaps through an intuitive user interface.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Token Addresses](#token-addresses)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

Follow these steps to set up and run the project locally:

1. **Clone the repository**:
   Clone the repository from GitHub to your local machine by running the following command:
   ````bash
   git clone https://github.com/yourusername/project-name.git ```
   Navigate to the main project folder: Change to the directory where the project was cloned:
   ````

- cd project-name
  Verify the contents of the folder: Use ls to list the files in the directory and confirm you're in the correct folder:

- Install project dependencies:
  Run the following command to install all the necessary Node.js packages:

```
npm install
```

Run the project locally: Start the project by running the following command:

The project should now be live at http://localhost:3000/ (or another port, depending on your configuration). Open this URL in your web browser to access the dApp.

# Usage

Once the project is running, follow these steps to perform a token swap:

Navigate to the dApp: Open your browser and visit http://localhost:3000/ (or the appropriate URL if configured differently).

Choose token addresses: The dApp supports two tokens for swapping. You can use either one of the following token addresses for the transaction:

- Token 1 Address: 0x73Cbe15f840Cce4911C8378900d6a8C3615Dd0e1
- Token 2 Address: 0x2b5F95A4cfeE90BF6E1AD27C86f2a2F3db7e866D
- liquidity is already added with 0.1 and 0.5 fee scpecified

## Enter swap details:

- Amount to swap: Enter the amount of the selected token you wish to swap.
  Source token address: Choose one of the above token addresses as the source.
  Destination token address: Choose the other token as the destination.
  Review the swap: The UI will display the swap details, including the expected amount of the destination token.

Confirm the transaction: Once satisfied, click "Swap" to confirm the transaction. The dApp will execute the swap via the Uniswap V3 router, and the result will be displayed.

# Features

User-friendly interface: Swap tokens through a simple and intuitive UI.
Multiple token support: Swap between two supported token pairs.
