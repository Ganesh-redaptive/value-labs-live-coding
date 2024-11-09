import React, { useCallback, useEffect, useState } from 'react'
import { getProductDetails } from './API/getProducts';
import {TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody, } from '@mantine/core'

const PrductDetailsTable = () => {
    const [productData, setProductData]=useState([]);
    const [loading, setLoading]=useState(false);
    const [error, setError]=useState('');

    useEffect(()=>{
        const fetchDataFromServer = async() =>{
            try{
                setLoading(true);
                const data = await getProductDetails();
                setProductData(data);
            }
            catch (error) {
                setError(error)
            }
            finally{
                setLoading(false)
            }
        }
        
        fetchDataFromServer();
    },[]);

    //  rows memoised function for table load

    const rows = productData.map((product) => {
        return {
            title: product.title,
            description: product.description,
            images: product.images,
        };
    });
  return (
    <>
    {!loading&&!error && <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.ProductName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.ProductName}
              </TableCell>
              <TableCell align="right">{row.Descriptio}</TableCell>
              <TableCell align="right">{row.Image}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
    </>
  )
}

export default PrductDetailsTable


