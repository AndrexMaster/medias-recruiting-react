import React from "react";
import { ProductsList } from "./ProductsList";
import { ProductsNav } from "./ProductsNav";
import {Flex} from "@chakra-ui/react";

export const Products = () => {

    return (
        <Flex direction='column' gap={3}>
            <ProductsList/>
            <ProductsNav/>
        </Flex>
    )
}