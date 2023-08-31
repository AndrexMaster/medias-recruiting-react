import React from "react";
import { Box, Divider, Grid } from "@chakra-ui/react";
import { useSelector } from "react-redux";

// Components
import { Receipts } from "../organisms/Receipts";
import { CurrReceipt } from "../organisms/CurrReceipt";
import { Products } from "../organisms/Products";

export const MainTemplate = () => {
    const isReceiptEditing = useSelector((state) => state.currReceiptReducer.isReceiptEditing);

    return (
        <Box p={6} borderRadius={3} bg='gray.300'>
            <Grid templateColumns='1fr auto 2fr' gap={3}>
                <Products/>
                <Divider colorScheme='whiteAlpha' w='2px' orientation='vertical' />
                {
                    isReceiptEditing ?
                        <CurrReceipt/>
                    :
                        <Receipts/>
                }
            </Grid>
        </Box>
    )
}