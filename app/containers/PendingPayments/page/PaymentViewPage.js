import React, { memo } from "react"
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Typography,
    Grid,
    Button,
    Container,
    Box,
    Card,
    TextField,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
} from "@material-ui/core"
import { searchQueryParser } from "../../../utils/utils"
const base64 = require('base-64');
const PaymentViewPage = ({ history }) => {
    const [orderData, setOrderData] = React.useState({
        name: "Order 1",
        amoun: "100",
        quantity: "1",
        date: "2020-01-01",

    });
    const token = searchQueryParser('token')

    React.useEffect(() => {
        const decoded = token ? base64.decode(token) : null
        if (decoded) {
            const data = JSON.parse(decoded)
            setOrderData(data)
            console.log(data)

        }

    }, [token])
    
    const handlePayNow = () => {
        history.push(
            {
                pathname: '/payment-options',
                state: {
                    orderData
                }
            }
        )
    }
    return (
        <Container maxWidth="md">
            <Box my={5} bgcolor="#F5F5F5" px={4} py={2}>
                <Typography variant="h3" color="primary" >Pending Payment</Typography>
            </Box>
            <Card raised={true} sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer style={{
                    maxHeight: 440,
                }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Customer Name</TableCell>
                                <TableCell>Order Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{orderData.orderCode}</TableCell>
                                <TableCell>{orderData.name}</TableCell>
                                <TableCell>{orderData.amoun}</TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box display="flex" px={4} py={2}>
                    <Box ml="auto">
                        <Button onClick={() => handlePayNow()} variant="contained" color="primary" >Pay Now</Button>
                    </Box>

                </Box>

            </Card>



        </Container>
    )
}

export default compose(
    withRouter,
    memo,
)(PaymentViewPage);