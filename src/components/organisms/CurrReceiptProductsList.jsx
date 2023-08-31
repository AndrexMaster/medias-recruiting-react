import React, { useEffect } from "react";
import {
    Box,
    StackDivider,
    VStack,
    Heading,
    Center
} from "@chakra-ui/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { CurrReceiptProduct } from "../molecules/CurrReceiptProduct";

export const CurrReceiptProductsList = () => {

    const dispatch = useDispatch()
    const currReceiptId = useSelector((state) => state.currReceiptReducer.receiptId);
    const currReceiptProducts = useSelector((state) => state.currReceiptReducer.productsInReceipt);

    useEffect(() => {
        axios
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
    }, [currReceiptId, dispatch]);

    return (
        <Box bg='white' height='100%' p={3} borderRadius={3}>
            {
                currReceiptProducts.length > 0 ?
                    <VStack
                        divider={<StackDivider borderColor='gray.200' />}
                        spacing={3}
                        align='stretch'
                    >
                        {
                            currReceiptProducts.map((data, idx) => {
                                return (
                                    <CurrReceiptProduct key={idx} productData={data}/>
                                )
                            })
                        }
                    </VStack>
                :
                    <Center h='100%'>
                        <Heading color='gray.300' as='h3' size='lg'>Can't find any products in this receipt</Heading>
                    </Center>
            }
        </Box>
    )
}