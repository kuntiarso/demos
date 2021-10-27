import React from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

interface MyOrdersProps {
  beverage: string
  createdAt: string
  id: string
  qty: number
  sugar: string
  type: string
  updatedAt: string
  userId: string
};

const CustomizedTable: React.FC<{ orders: string }> = (props) => {
  const orders: MyOrdersProps[] = JSON.parse(props.orders)

  return (
    <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
      <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Beverage</StyledTableCell>
            <StyledTableCell align="right">Drink Type</StyledTableCell>
            <StyledTableCell align="right">Sugar Level</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Created At</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order: MyOrdersProps) => (
            <StyledTableRow key={order.id}>
              <StyledTableCell component="th" scope="row">{order.beverage}</StyledTableCell>
              <StyledTableCell align="right">{order.type}</StyledTableCell>
              <StyledTableCell align="right">{order.sugar}</StyledTableCell>
              <StyledTableCell align="right">{order.qty}</StyledTableCell>
              <StyledTableCell align="right">{order.createdAt}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomizedTable