import React from "react";
import {
    Box,
    Button,
    Typography,
    Grid,
    TableHead,
    TableRow,
    TableCell,
    Table,
    TableBody,
    TableContainer,
    TableFooter,
    Container,
    Paper
} from '@material-ui/core';

const ProductTable = ({ productData = [], handleDelete, voucher, voucherActive, partialVoucherActive }) => {

    return (
        <Paper style={{ width: '100%', }} >
            <TableContainer style={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Prd#.</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Unit</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        < >
                            {productData.length > 0 ? productData.map((item, index) => {

                                return (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>{item.unit}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>
                                            <Typography variant="h6" >
                                                Freight Charges
                                            </Typography>
                                            <Typography variant="h6" style={{
                                                fontWeight: 'bold',
                                                marginTop: '2px',
                                                marginBottom: '2px'

                                            }}>

                                                ₹{item.freightCharges}
                                            </Typography>
                                            <Typography variant="h6">
                                                GST
                                            </Typography>
                                            <Typography variant="h6" style={{
                                                fontWeight: 'bold',
                                                marginTop: '2px',
                                                marginBottom: '2px'

                                            }} >
                                                ₹{item.gst}
                                            </Typography>
                                            <Typography variant="h6">
                                                Total
                                            </Typography>
                                            <Typography variant="h6" style={{
                                                fontWeight: 'bold',
                                                marginTop: '2px',
                                                marginBottom: '2px'

                                            }}>
                                                ₹{item.total}
                                            </Typography>

                                        </TableCell>
                                        <TableCell>
                                            <Button size="small" onClick={() => handleDelete(item)} variant="contained" >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>



                                )
                            }) :
                                <TableRow style={{ border: 0 }} >
                                    <TableCell ></TableCell>
                                    <TableCell ></TableCell>

                                    <TableCell  >No Product Added</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>


                                </TableRow>
                            }
                            {
                                productData.length > 0 &&
                                <TableRow style={{ border: 0 }} >
                                    <TableCell>


                                    </TableCell>
                                    <TableCell>


                                    </TableCell>
                                    <TableCell>


                                    </TableCell>
                                    <TableCell>


                                    </TableCell>
                                    <TableCell variant="footer" >
                                        <Typography
                                            variant="h6"
                                            style={{
                                                fontWeight: 'bold',
                                                marginTop: '2px',
                                                marginBottom: '2px'
                                            }}
                                        >
                                            {/* Voucher : ₹{productData.reduce((acc, item) => {
                                                return parseFloat(parseFloat(acc) + parseFloat(item.total)).toFixed(2)
                                            }, 0)} */}
                                            Total Amount: ₹{productData.reduce((acc, item) => {
                                                return parseFloat(parseFloat(acc) + parseFloat(item.total)).toFixed(2)
                                            }, 0)}
                                        </Typography>
                                        {voucherActive &&
                                            <>
                                                <Typography
                                                    variant="h6"
                                                    style={{
                                                        fontWeight: 'bold',
                                                        marginTop: '2px',
                                                        marginBottom: '2px'
                                                    }}
                                                >
                                                    {/* Voucher : ₹{productData.reduce((acc, item) => {
                                                return parseFloat(parseFloat(acc) + parseFloat(item.total)).toFixed(2)
                                            }, 0)} */}
                                                    Voucher Amount: ₹{voucher > productData.reduce((acc, item) => {
                                                        return parseFloat(parseFloat(acc) + parseFloat(item.total)).toFixed(2)
                                                    }, 0) ? productData.reduce((acc, item) => {
                                                        return parseFloat(parseFloat(acc) + parseFloat(item.total)).toFixed(2)
                                                    }, 0) : voucher}
                                                </Typography>
                                                <Typography
                                                    variant="h6"
                                                    style={{
                                                        fontWeight: 'bold',
                                                        marginTop: '2px',
                                                        marginBottom: '2px'
                                                    }}
                                                >

                                                    {/* Grand Total : ₹{productData.reduce((acc, item) => {
                                             return parseFloat(parseFloat(acc) + parseFloat(item.total)).toFixed(2) 
                                         }, 0) - voucher }  */}
                                                    Grand Total : ₹{voucher >= productData.reduce((acc, item) => {
                                                        return parseFloat(parseFloat(acc) + parseFloat(item.total)).toFixed(2)
                                                    }, 0) ? 0 : (productData.reduce((acc, item) => {
                                                        return parseFloat(parseFloat(acc) + parseFloat(item.total)).toFixed(2)
                                                    }, 0) - voucher).toFixed(2)}

                                                </Typography>
                                            </>
                                        }
                                        {
                                            partialVoucherActive &&
                                            <>
                                                <Typography
                                                    variant="h6"
                                                    style={{
                                                        fontWeight: 'bold',
                                                        marginTop: '2px',
                                                        marginBottom: '2px'
                                                    }}
                                                >
                                                    Voucher Amount: {voucher * 2.5 >= productData.reduce((acc, item) => {
                                                        return parseFloat(parseFloat(acc) + parseFloat(item.freightCharges)).toFixed(2)
                                                    }, 0) ? 'N/A' : voucher}
                                                </Typography>
                                                <Typography
                                                    variant="h6"
                                                    style={{
                                                        fontWeight: 'bold',
                                                        marginTop: '2px',
                                                        marginBottom: '2px'
                                                    }}
                                                >
                                                    {/* Grand Total : ₹{productData.reduce((acc, item) => {
                                                return parseFloat(parseFloat(acc) + parseFloat(item.total)).toFixed(2) 
                                            }, 0) - voucher }  */}
                                                    Grand Total : ₹{voucher * 2.5 >= productData.reduce((acc, item) => {
                                                        return parseFloat(parseFloat(acc) + parseFloat(item.freightCharges)).toFixed(2)
                                                    }, 0) ? productData.reduce((acc, item) => {
                                                        return parseFloat(parseFloat(acc) + parseFloat(item.total)).toFixed(2)
                                                    }, 0) : ((productData.reduce((acc, item) => {
                                                        return parseFloat(parseFloat(acc) + parseFloat(item.gst))
                                                    }, 0)) + (productData.reduce((acc, item) => {
                                                        return parseFloat(parseFloat(acc) + parseFloat(item.freightCharges))
                                                    }, 0) - voucher)).toFixed(2)
                                                    }
                                                </Typography>
                                            </>
                                        }
                                    </TableCell>
                                    <TableCell>


                                    </TableCell>

                                </TableRow>


                            }

                        </>
                    </TableBody>

                </Table>

            </TableContainer>
        </Paper>
    )
}
export default ProductTable;