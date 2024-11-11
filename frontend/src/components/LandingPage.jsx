import {
  useContract,
  useContractEvents,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { DEX_ABI, DEX_ADDRESS } from "../lib/constant";
import React, { useEffect, useState } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { formatEther, parseEther } from "ethers/lib/utils";
import axios from "axios";

function LandingPage() {
  const [state, setState] = useState({
    amount: "",
    tokenIn: "",
    tokenOut: "",
  });

  const [eventData, setEventData] = useState();

  const { contract: DEX_CONTRACT } = useContract(DEX_ADDRESS, DEX_ABI);

  const { data: getQuote } = useContractRead(DEX_CONTRACT, "getQuote", [
    state.tokenIn,
    state.tokenOut,
    state.amount,
  ]);

  const { mutateAsync: swapTokens, isLoading: loadingSwapTokens } =
    useContractWrite(DEX_CONTRACT, "swapTokens");

  const [latestEvent, setLatestEvent] = useState(null);
  const { data, isLoading, error } = useContractEvents(
    DEX_CONTRACT,
    "swapOccured",
    {
      subscribe: true,
    }
  );

  useEffect(() => {
    if (data && data.length > 0) {
      console.log(
        "dsfds",
        formatEther(String(data[data.length - 1].data._amount))
      );

      setLatestEvent(data[data.length - 1]);
    }
  }, [data]);

  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:8000/api/getAllEvents");

      setEventData(res.data.data);
    })();
  }, [data]);

  const handleSubmit = async () => {
    console.log("state", state);
    try {
      const swapToken = await swapTokens({
        args: [parseEther(state.amount), state.tokenIn, state.tokenOut],
      });
      // console.log("🚀 ~ handleSubmit ~ swapToken:", swapToken);
      // console.log("🚀 ~ LandingPage ~ getQuote:", String(getQuote));

      const data = {
        amount: state.amount,
        timestamp: String(latestEvent.data._timestamp),
        tokenIn: state.tokenIn,
        tokenOut: state.tokenOut,
      };

      await axios.post("http://localhost:8000/api/saveEvent", data);
      console.log("data", data);
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
      <div className="w-full md:w-1/3 max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6 m-2">
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
          {loadingSwapTokens && loadingSwapTokens ? (
            <button className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
              Loading...
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          )}
        </div>
        {/* Connect Wallet Button */}
        <div className="mt-6 text-center">
          <ConnectWallet />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between text-gray-700">
            <span>Input Amount:</span>
            <span>{state.amount}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Output Amount:</span>
            <span>{String(getQuote)}</span>
          </div>
        </div>
      </div>

      {/* Middle Card (Summary) */}
      <div className="w-full md:w-1/3 max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6 m-2">
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

      {/* Right Card (Transaction History) */}
      <div className="w-full md:w-96 bg-white p-8 rounded-lg shadow-lg space-y-6 m-2">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Transaction History
        </h1>
        {/* List of Recent Transactions */}
        {eventData && eventData.length > 0 ? (
          eventData.map((transaction, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <div className="flex justify-between text-gray-700 mb-2">
                <span className="font-medium">Amount:</span>
                {transaction.amount}
              </div>
              <div className="text-gray-600">
                <p className="text-sm">
                  <span className="font-medium">Timestamp:</span>{" "}
                  {transaction.timestamp}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Token In:</span>{" "}
                  {transaction.tokenIn}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Token Out:</span>{" "}
                  {transaction.tokenOut}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No recent transactions.</p>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
