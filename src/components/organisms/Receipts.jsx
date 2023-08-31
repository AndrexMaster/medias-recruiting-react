import React from "react";
import { Flex } from "@chakra-ui/react";

// Components
import { ReceiptsNav } from "./ReceiptsNav";
import { ReceiptsList } from "./ReceiptsList";

export const Receipts = () => {

    return (
        <Flex direction='column' gap={3}>
            <ReceiptsList/>
            <ReceiptsNav/>
        </Flex>
    )
}