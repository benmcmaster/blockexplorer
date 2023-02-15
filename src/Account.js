import * as React from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Container, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IconButton} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Utils } from 'alchemy-sdk';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };
  
const alchemy = new Alchemy(settings);

export default function Account() {

    const {hash} = useParams();

    const [accountBalance, setAccountBalance] = useState();

    useEffect(() => {
      async function getAccount() {
        const accountBalanceResponse = await alchemy.core.getBalance(hash);
        setAccountBalance(Utils.formatUnits(accountBalanceResponse, "ether"));
      }
      getAccount();
  
    }, []);

    if (!accountBalance) {
        return null;
    }

    return (
        <Container maxWidth="md">
            <Link to="/">
                <IconButton aria-label="home" size="large"                 
                    sx={{
                        marginBottom: "10px",
                    }}
                >
                    <HomeIcon fontSize="inherit" />
                </IconButton>
            </Link>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        <TableRow
                            key="accountBalance"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                Account Balance
                            </TableCell>
                            <TableCell align="right">{accountBalance + " ETH"}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}