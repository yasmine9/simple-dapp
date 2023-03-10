import "./App.css";
import MyContract from "./artifacts/contracts/MyContract.sol/MyContract.json";
import { ethers } from "ethers";
import { useState } from "react";

// store our contract address
const CONTRACT_ADDRESS =
  "0x4b5DD2Fc182B05bC726d348Fb3d765B7Ef323bcB".toLowerCase();

function App() {
  // Property Variables

  const [currentNumber, setCurrentNumber] = useState("");
  // value read from the blockchain
  const [value, setValue] = useState("");

  // read the current number value
  async function fetchNumber() {
    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        MyContract.abi,
        provider.getSigner()
      );
      try {
        const data = await contract.readNb();
        setCurrentNumber(Number(data));
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }
  // function to write a new number into the blockchain
  async function setNumber() {
    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        MyContract.abi,
        provider.getSigner()
      );
      try {
        await contract.setNumber(value);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }
  // read the current cpt value
  async function fetchCpt() {
    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        MyContract.abi,
        provider.getSigner()
      );
      try {
        const data = await contract.readCpt();

        setCurrentNumber(Number(data));
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }
  return (
    <div className="App">
      <div className="App-header">
        <div className="custom-buttons">
          <p>My first dApp</p>
          <button onClick={fetchNumber} style={{ color: "black" }}>
            Read number
          </button>
          <button onClick={fetchCpt} style={{ color: "black" }}>
            Read cpt
          </button>
        </div>
        <div className="custom-buttons">
          <button onClick={setNumber} style={{ color: "black" }}>
            Write number
          </button>
          <input
            placeholder="Set number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></input>
          <h2 className="greeting">Fetched data: {currentNumber}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
