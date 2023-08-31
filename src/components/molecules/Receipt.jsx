import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import {useDispatch} from "react-redux";

export const Receipt = ({receiptData}) => {
    const dispatch = useDispatch()

    const openReceipt = () => {
        dispatch({ type: 'SET_CURR_RECEIPT_ID', payload: receiptData.id });
        dispatch({ type: 'SET_RECEIPT_EDIT_STATUS', payload: true });
    }

    return (
        <Button p={3} borderRadius={3} onClick={() => openReceipt()}>
            <Flex w='100%' h='100%'>
                Receipt № {receiptData.number}
            </Flex>
        </Button>
    )
}