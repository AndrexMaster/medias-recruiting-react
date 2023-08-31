import React, {useEffect, useState} from "react";
import {Box, Center, Heading, StackDivider, VStack} from "@chakra-ui/react";

// Components
import { Product } from "../molecules/Product";
import axios from "axios";

export const ProductsList = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:4444/products')
            .then((res) => {
                setProducts(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    return (
        <Box bg='white' p={3} borderRadius={3} height='100%' maxHeight='674px' overflow='scroll'>
            {
                products.length > 0 ?
                    <VStack
                        divider={<StackDivider borderColor='gray.200' />}
                        spacing={3}
                        align='stretch'
                    >
                        {

                            products.map((data, idx) => {
                                return (
                                    <Product key={idx} productData={data}/>
                                )
                            })
                        }
                    </VStack>
                :
                    <Center h='100%'>
                        <Heading color='gray.300' as='h3' size='lg'>Can't find any receipts</Heading>
                    </Center>
            }
        </Box>
    )
}