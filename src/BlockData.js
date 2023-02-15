import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Container, Paper } from '@mui/material';
import { Link } from 'react-router-dom'


export default function BlockData({block}) {

    if (!block) {
        return null;
    }
    const timestamp = new Date(parseInt(block.timestamp)*1000);

    return (
        <Container maxWidth="md">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        <TableRow
                            key="height"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                Block Height
                            </TableCell>
                            <TableCell align="right">{block.number}</TableCell>
                        </TableRow>
                        <TableRow
                            key="hash"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                Timestamp
                            </TableCell>
                            <TableCell align="right">{timestamp.toLocaleString()}</TableCell>
                        </TableRow>
                        <TableRow
                            key="timestamp"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                Transactions
                            </TableCell>
                            <TableCell align="right">
                                <Link to={"transactions/"}>{block.transactions.length} Transactions</Link>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}