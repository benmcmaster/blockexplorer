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

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };
  
const alchemy = new Alchemy(settings);

export default function Transaction() {

    const {hash} = useParams();

    const [transaction, setTransaction] = useState();

    useEffect(() => {
      async function getTransaction() {
        const response = await alchemy.transact.getTransaction(hash);
        setTransaction(response);
      }

      getTransaction();
  
    }, []);

    if (!transaction) {
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
                            key="hash"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                Transaction Hash
                            </TableCell>
                            <TableCell align="right">{transaction.hash}</TableCell>
                        </TableRow>
                        <TableRow
                            key="block"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                Block
                            </TableCell>
                            <TableCell align="right">{transaction.blockNumber}</TableCell>
                        </TableRow>
                        <TableRow
                            key="to"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                To
                            </TableCell>
                            <TableCell align="right">
                                <Link to={"/accounts/" + transaction.to}>{transaction.to}</Link>
                            </TableCell>
                        </TableRow>
                        <TableRow
                            key="from"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                From
                            </TableCell>
                            <TableCell align="right">
                                <Link to={"/accounts/" + transaction.from}>{transaction.from}</Link>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}