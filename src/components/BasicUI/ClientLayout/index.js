import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import { Box } from '@chakra-ui/react'
import Sider from './Sider'

const ClientLayout = () => {
    return (
        <Box>
            <Header />
            <Sider />
            <Outlet />
        </Box>
    )
}

export default ClientLayout