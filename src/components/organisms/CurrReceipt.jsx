import React from "react";
import { Flex } from "@chakra-ui/react";
import { CurrReceiptProductsList } from "./CurrReceiptProductsList";
import { CurrReceiptNav } from "./CurrReceiptNav";


export const CurrReceipt = () => {

    return (
        <Flex direction='column' gap={3}>
            <CurrReceiptProductsList/>
            <CurrReceiptNav/>
        </Flex>
    )
}