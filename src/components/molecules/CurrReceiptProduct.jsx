import React from "react";
import {
    Box,
    Flex,
    IconButton,
    Text
} from "@chakra-ui/react";
import { AddIcon, CloseIcon, MinusIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export const CurrReceiptProduct = ({productData}) => {
    const dispatch = useDispatch()
    const currReceiptProducts = useSelector((state) => state.currReceiptReducer.productsInReceipt);
    const currReceiptId = useSelector((state) => state.currReceiptReducer.receiptId);

    const updateProductsInReceipt = async () => {
        await axios
            .get(`http://localhost:4444/product-in-receipt`, {
                params: {
                    receipt_id: currReceiptId
                }
            })
            .then((res) => {
                dispatch({ type: 'SET_PRODUCTS_IN_RECEIPT', payload: res.data });
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const removeFromReceipt = async () => {
        const sameProduct = await currReceiptProducts.find(receiptProduct => receiptProduct.product.id === productData.product.id)
        await axios
            .delete('http://localhost:4444/product-in-receipt', {
                params: {
                    productInReceiptId: sameProduct.id,
                }
            })
            .catch((err) => {
                console.log('Deletion Failed', err)

            })

        await updateProductsInReceipt()

    }

    const updateQuantity = async (newQuantity) => {
        if (newQuantity < 1) {
            removeFromReceipt()
        } else {
            const sameProduct = currReceiptProducts.find(receiptProduct => receiptProduct.product.id === productData.product.id)

            await axios
                .put('http://localhost:4444/product-in-receipt', {
                    params: {
                        productInReceiptId: sameProduct.id,
                        quantity: newQuantity,
                    }
                })
                .catch((err) => {
                    console.log('Updating Failed', err)
                })

            await updateProductsInReceipt()
        }
    }
    
    return (
        <Box
            p={2}
            bg='gray.200'
            borderRadius={3}
        >
            <Flex gap={3} alignItems='center' minHeight='26.5px'>
                <Text mr='auto' fontSize='md'>{productData.product?.name}</Text>
                <Text fontSize='md'>{productData.price} ₴</Text>
                <Box p={1} borderWidth='1px' borderRadius={5} borderColor='gray.300'>
                    <Flex flexDirection='row' gap={3}>
                        <IconButton
                            size='xs'
                            p={1}
                            variant='outline'
                            colorScheme='facebook'
                            title='Decrement'
                            aria-label='Decrement'
                            icon={<MinusIcon />}
                            onClick={() => updateQuantity(productData.quantity - 1)}
                        />
                        <Text fontSize='md'>{productData.quantity}</Text>
                        <IconButton
                            size='xs'
                            p={1}
                            variant='outline'
                            colorScheme='facebook'
                            title='Increment'
                            aria-label='Increment'
                            icon={<AddIcon />}
                            onClick={() => updateQuantity(productData.quantity + 1)}
                        />
                    </Flex>
                </Box>
                <IconButton
                    size='xs'
                    p={1}
                    variant='outline'
                    colorScheme='red'
                    title='Add to receipt'
                    aria-label='Add to receipt'
                    icon={<CloseIcon />}
                    onClick={() => removeFromReceipt()}
                />
            </Flex>
        </Box>
    );
};