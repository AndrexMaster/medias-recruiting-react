import React, { useEffect } from "react";
import {Box, Center, Grid, Heading} from "@chakra-ui/react";
import { Receipt } from "../molecules/Receipt";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";

export const ReceiptsList = () => {
    const dispatch = useDispatch()
    const receipts = useSelector((state) => state.recieptsReducer.receipts);

    useEffect(() => {
        axios
            .get('http://localhost:4444/receipts')
            .then((res) => {
                dispatch({ type: 'SET_RECEIPTS', payload: res.data });
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    return (
        <Box bg='white' height='100%' maxHeight='674px' p={3} borderRadius={3}>
            {
                receipts.length > 0 ?
                    <Grid templateColumns='repeat(3, 1fr)' gap={3}>
                        {

                            receipts.map((data, idx) => {
                                return (
                                <Receipt key={idx} receiptData={data}/>
                                )
                            })
                        }
                    </Grid>
                :
                    <Center h='100%'>
                        <Heading color='gray.300' as='h3' size='lg'>Can't find any receipts</Heading>
                    </Center>
            }
        </Box>
    )
}