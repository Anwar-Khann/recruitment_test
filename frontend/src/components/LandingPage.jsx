import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { DEX_ABI, DEX_ADDRESS } from "../lib/constant";
import React, { useState } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";

function LandingPage() {
  const [state, setState] = useState({
    amount: "",
    tokenIn: "",
    tokenOut: "",
  });

  const { contract: DEX_CONTRACT } = useContract(DEX_ADDRESS, DEX_ABI);

  const { mutateAsync: swapTokens } = useContractWrite(
    DEX_CONTRACT,
    "swapTokens"
  );

  const handleSubmit = async () => {
    console.log(state);
    try {
      const swapToken = await swapTokens({
        args: [state.amount, state.tokenIn, state.tokenOut, "0"],
      });
    } catch (error) {
      console.error("contract call successs", error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-6">Landing Page</h1>

        <div className="w-full max-w-md space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Amount
            </label>
            <input
              type="text"
              placeholder="00000"
              name="amount"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Token In
            </label>
            <input
              type="text"
              placeholder="0x00000"
              name="tokenIn"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Token Out
            </label>
            <input
              type="text"
              placeholder="0x00000"
              name="tokenOut"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>

        <ConnectWallet />
      </div>
    </>
  );
}

export default LandingPage;
