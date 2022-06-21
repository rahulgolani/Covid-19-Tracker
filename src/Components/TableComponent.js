import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./table.css";
import { Typography } from "@mui/material";
import { formatNumbersV2 } from "./utils";

function TableComponent({ countries }) {
  return (
    <div className="table">
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">
                  <strong>Country</strong>
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">
                  <strong>Cases</strong>
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries.map(({ country, cases }) => (
              <TableRow
                className="tablerow"
                key={country}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {country}
                </TableCell>
                <TableCell align="right">{formatNumbersV2(cases)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableComponent;
