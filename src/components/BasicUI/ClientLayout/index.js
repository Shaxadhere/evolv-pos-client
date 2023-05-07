import { Box, useDisclosure, useColorMode } from '@chakra-ui/react';
import React from 'react'
import Sider from './Sider';
import Header from './Header';
import { Outlet, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminLayout = () => {
    const sidebar = useDisclosure();
    const { pathname } = useLocation()
    const token = useSelector((state) => state.user.token)
    const { colorMode } = useColorMode()

    if (!token) {
    return <Navigate to="/auth/login" replace={true} />
    }

    return (
        <Box
            as="section"
            minH="100vh"
        >
            <Sider disclosure={sidebar} />
            <Box
                ml={{
                    base: 0,
                    md: "80px",
                }}
                transition=".3s ease"
            >
                <Header disclosure={sidebar} />
                <Box
                    as="main"
                    p="4"
                    minH="calc(100vh - 60px)"
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}

export default AdminLayout