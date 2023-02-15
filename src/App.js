import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import BlockData from './BlockData';
import Transactions from './Transactions';
import Transaction from './Transaction';
import Account from './Account';
import { Container } from '@mui/material';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [block, setBlock] = useState();

  useEffect(() => {
    async function getBlockWithTransactions() {
      setBlock(await alchemy.core.getBlockWithTransactions());
    }

    getBlockWithTransactions();

  }, []);

  return (
    <BrowserRouter>
      <Container 
        maxWidth="false"
        sx={{
          backgroundImage: "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "50px",
        }}>
        <Routes>
          <Route path="/" element={<BlockData block={block}/>} />
          <Route path="/transactions" element={<Transactions block={block}/>} />
          <Route path="/transactions/:hash" element={<Transaction/>} />
          <Route path="/accounts/:hash" element={<Account/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
