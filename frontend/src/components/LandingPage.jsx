// import { useContract, useContractWrite } from "@thirdweb-dev/react";
// import { DEX_ABI, DEX_ADDRESS } from "../lib/constant";
// import React, { useState } from "react";
// import { ConnectWallet } from "@thirdweb-dev/react";
// import { parseEther } from "ethers/lib/utils";

// function LandingPage() {
//   const [state, setState] = useState({
//     amount: "",
//     tokenIn: "",
//     tokenOut: "",
//   });

//   const { contract: DEX_CONTRACT } = useContract(DEX_ADDRESS, DEX_ABI);

//   const { mutateAsync: swapTokens } = useContractWrite(
//     DEX_CONTRACT,
//     "swapTokens"
//   );

//   const handleSubmit = async () => {
//     console.log(state);
//     try {
//       const swapToken = await swapTokens({
//         args: [parseEther(state.amount), state.tokenIn, state.tokenOut],
//       });
//     } catch (error) {
//       console.error("contract call successs", error.message);
//     }
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setState((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   return (
//     <>
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//         <h1 className="text-2xl font-bold mb-6">Landing Page</h1>

//         <div className="w-full max-w-md space-y-4">
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Amount
//             </label>
//             <input
//               type="text"
//               placeholder="00000"
//               name="amount"
//               onChange={handleInputChange}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Token In
//             </label>
//             <input
//               type="text"
//               placeholder="0x00000"
//               name="tokenIn"
//               onChange={handleInputChange}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Token Out
//             </label>
//             <input
//               type="text"
//               placeholder="0x00000"
//               name="tokenOut"
//               onChange={handleInputChange}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
//             />
//           </div>

//           {/* Submit button */}
//           <button
//             onClick={handleSubmit}
//             className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
//           >
//             Submit
//           </button>
//         </div>

//         <ConnectWallet />
//       </div>
//     </>
//   );
// }

// export default LandingPage;

import {
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { DEX_ABI, DEX_ADDRESS } from "../lib/constant";
import React, { useState } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { parseEther } from "ethers/lib/utils";

function LandingPage() {
  const [state, setState] = useState({
    amount: "",
    tokenIn: "",
    tokenOut: "",
  });

  const { contract: DEX_CONTRACT } = useContract(DEX_ADDRESS, DEX_ABI);

  const { data: getQuote } = useContractRead(DEX_CONTRACT, "getQuote", [
    state.tokenIn,
    state.tokenOut,
    state.amount,
  ]);

  const { mutateAsync: swapTokens } = useContractWrite(
    DEX_CONTRACT,
    "swapTokens"
  );

  const handleSubmit = async () => {
    console.log(state);
    try {
      const swapToken = await swapTokens({
        args: [parseEther(state.amount), state.tokenIn, state.tokenOut],
      });

      console.log("🚀 ~ LandingPage ~ getQuote:", String(getQuote));
    } catch (error) {
      console.error("Contract call failed:", error.message);
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
    <div className="flex flex-wrap min-h-screen bg-gray-100 p-4 justify-center">
      {/* Left Card (Form) */}
      <div className="w-full md:w-1/2 max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Token Swap
        </h1>

        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Amount
            </label>
            <input
              type="text"
              placeholder="Enter amount"
              name="amount"
              onChange={handleInputChange}
              value={state.amount}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Token In
            </label>
            <input
              type="text"
              placeholder="Enter token address (e.g., 0x0000)"
              name="tokenIn"
              onChange={handleInputChange}
              value={state.tokenIn}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Token Out
            </label>
            <input
              type="text"
              placeholder="Enter token address (e.g., 0x0000)"
              name="tokenOut"
              onChange={handleInputChange}
              value={state.tokenOut}
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

        {/* Connect Wallet Button */}
        <div className="mt-6 text-center">
          <ConnectWallet />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-gray-700">
            <span>MTK:</span>
            <span>{state.amount}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>WETH:</span>
            <span>{String(getQuote)}</span>
          </div>
        </div>
      </div>

      {/* Right Card (Summary) */}
      <div className="w-full md:w-1/2 max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6 md:ml-6 mt-6 md:mt-0">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Entered Information
        </h1>

        {/* Display entered values (Token In, Token Out, Amount) */}
        {state.amount && state.tokenIn && state.tokenOut ? (
          <div className="space-y-4">
            <div className="flex justify-between text-gray-700">
              <span>Amount:</span>
              <span>{state.amount}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Quote:</span>
              <span>{String(getQuote)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Token In:</span>
              <span>{state.tokenIn}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Token Out:</span>
              <span>{state.tokenOut}</span>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">
            Please enter the details to see the summary.
          </p>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
