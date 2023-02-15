import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import { Utils } from 'alchemy-sdk';
import { Link } from 'react-router-dom';
import { IconButton} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';


function truncate(str, n){
    if (!str) {
        return ""
    }
    str = str.toString();
    const returnString = (str.length > n) ? str.slice(0, n-1) + '...' : str;
    return returnString
};

export default function Transactions({block}) {

    if (!block) {
        return null;
    }

    const transactions = [];
    block.transactions.forEach( (transaction) => {
        const newTx = {};
        newTx.fullHash = transaction.hash;
        newTx.hash = truncate(transaction.hash, 7);
        newTx.blockNumber = transaction.blockNumber;
        newTx.from = truncate(transaction.from, 7);
        newTx.to = truncate(transaction.to, 7);
        newTx.value = "";
        if (transaction.value) {
            newTx.value = Utils.formatUnits(transaction.value, "ether");
        }
        newTx.maxFeePerGas = "";
        if (transaction.maxFeePerGas) {
            newTx.maxFeePerGas = Utils.formatUnits(transaction.maxFeePerGas, "ether");
        }
        
        transactions.push(newTx)
    });

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
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Txn Hash</TableCell>
                            <TableCell align="left">Block</TableCell>
                            <TableCell align="left">From</TableCell>
                            <TableCell align="left">To</TableCell>
                            <TableCell align="left">Value</TableCell>
                            <TableCell align="left">Txn Fee</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow
                            key={transaction.fullHash}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">
                                <Link to={transaction.fullHash}>{transaction.hash}</Link>
                            </TableCell>
                            <TableCell align="left">{transaction.blockNumber}</TableCell>
                            <TableCell align="left">{transaction.from}</TableCell>
                            <TableCell align="left">{transaction.to}</TableCell>
                            <TableCell align="left">{transaction.value}</TableCell>
                            <TableCell align="left">{transaction.maxFeePerGas}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}