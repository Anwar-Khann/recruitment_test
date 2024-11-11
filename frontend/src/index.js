import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

const root = ReactDOM.createRoot(document.getElementById("root"));

const initializeApp = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      const decimalChainId = parseInt(chainId, 16);
      console.log("🚀 ~ file: index.js:21 ~ decimalChainId:", decimalChainId);
    } catch (error) {
      console.error("Error getting chainId:", error);
    }
  } else {
    console.error("MetaMask is not installed.");
  }

  root.render(
    <ThirdwebProvider
      activeChain={Sepolia}
      clientId="55ea2d6607abcc303f926751ce06ab25"
    >
      <App />
    </ThirdwebProvider>
  );
};

initializeApp();
