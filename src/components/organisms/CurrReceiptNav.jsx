import React, {useEffect} from "react";
import {Box, Button, Flex, Stat, StatLabel, StatNumber} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";

export const CurrReceiptNav = () => {
    const dispatch = useDispatch()
    const currReceiptProducts = useSelector((state) => state.currReceiptReducer.productsInReceipt);
    const currReceiptId = useSelector((state) => state.currReceiptReducer.receiptId);

    useEffect(() => {
        axios
            .put('http://localhost:4444/receipts', {
                params: {
                    totalAmount: getSumOfProductsQuantity(),
                    receipt_id: currReceiptId
                }
            })
            .then(() => {

            })
            .catch(() => {

            })
    }, [currReceiptProducts]);



    const getSumOfProductsQuantity = () => {
        let productsSum = 0

        currReceiptProducts.map((product) => {
            productsSum += (product.price * product.quantity)
        })

        return productsSum;
    }

    const closeReceipt = () => {
        dispatch({ type: 'SET_RECEIPT_EDIT_STATUS', payload: false });
    }

    return (
        <Flex alignItems='center' justifyContent='space-between' gap={3}>
            <Box px={3} py={2} bg='white' w='fit-content' borderRadius={3}>
                <Stat>
                    <StatLabel>Sum</StatLabel>
                    <StatNumber>{getSumOfProductsQuantity()} ₴</StatNumber>
                </Stat>
            </Box>
            <Button colorScheme='green' onClick={closeReceipt}>Pay for receipt</Button>
        </Flex>
    )
}