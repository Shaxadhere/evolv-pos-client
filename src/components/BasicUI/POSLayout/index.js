import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import { Box } from '@chakra-ui/react'
import Sider from './Sider'
import RightSider from './RightSider'

const POSLayout = () => {
    return (
        <Box>
            <Header />
            {/* <Sider />
            <Box as="main"
                pos="fixed"
                top="60px"
                left="400px"
                right="400px"
                w="calc(100vw - 800px)"
                h="calc(100vh - 60px)"
                overflowY="auto"
                p="20px"
            > */}

                <Outlet />
            {/* </Box>
            <RightSider /> */}
        </Box>
    )
}

export default POSLayout