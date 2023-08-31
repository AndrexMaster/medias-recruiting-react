import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Flex,
    IconButton,
    Text
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";

export const Product = ({productData}) => {
    const dispatch = useDispatch();
    const currReceiptId = useSelector((state) => state.currReceiptReducer.receiptId);
    const currReceiptProducts = useSelector((state) => state.currReceiptReducer.productsInReceipt);

    const addToReceipt = async () => {
        let newReceipt = null;

        if (currReceiptId === 0) {
            newReceipt = await axios
                .post('http://localhost:4444/receipts')
                .then((res) => {
                    return res;
                })
                .catch((err) => {
                    console.log(err)
                });
            dispatch({ type: 'SET_CURR_RECEIPT_ID', payload: newReceipt.data.id });
        }

        const sameProduct = currReceiptProducts.find(receiptProduct => receiptProduct.product.id === productData.id)

        if (sameProduct) {
            await axios
                .put('http://localhost:4444/product-in-receipt', {
                    params: {
                        productInReceiptId: sameProduct.id,
                        quantity: sameProduct.quantity + 1,
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            await axios
                .post('http://localhost:4444/product-in-receipt', {
                    params: {
                        receipt_id: newReceipt?.data?.id ?? currReceiptId,
                        product_id: productData.id,
                        quantity: 1,
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        await axios
            .get(`http://localhost:4444/product-in-receipt`, {
                params: {
                    receipt_id: newReceipt?.data?.id ?? currReceiptId
                }
            })
            .then((res) => {
                dispatch({ type: 'SET_PRODUCTS_IN_RECEIPT', payload: res.data });
            })
            .catch((err) => {
                console.log(err)
            })

        dispatch({ type: 'SET_RECEIPT_EDIT_STATUS', payload: true });
    };
    
    return (
        <Box
            p={2}
            bg='gray.200'
            borderRadius={3}
        >
            <Flex gap={3} alignItems='center' minHeight='26.5px'>
                <Text mr='auto' fontSize='md'>{productData.name}</Text>
                <Text fontSize='md'>{productData.price} ₴</Text>
                <IconButton
                    size='xs'
                    p={1}
                    variant='outline'
                    colorScheme='green'
                    title='Add to receipt'
                    aria-label='Add to receipt'
                    icon={<AddIcon />}
                    onClick={addToReceipt}
                />
            </Flex>
        </Box>
    );
};