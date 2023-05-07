import { Box, useDisclosure, useColorMode } from '@chakra-ui/react';
import React from 'react'
import Sider from './Sider';
import Header from './Header';
import { Navigate, Outlet, useLocation } from 'react-router';
import { getColor, colorKeys } from '../../../config/constants/appColors';
import { useSelector } from 'react-redux';
import { DEFAULT_HIDDEN_SIDEBAR_PAGES } from '../../../config/constants';

const AdminLayout = () => {
  const sidebar = useDisclosure();
  const { showSubsider } = useSelector((state) => state.setting)
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
          ml={{
            base: 0,
            md: !showSubsider
              ? DEFAULT_HIDDEN_SIDEBAR_PAGES.includes(pathname)
                ? "0"
                : "240px"
              : "0px",
          }}
          bg={DEFAULT_HIDDEN_SIDEBAR_PAGES.includes(pathname)
            ? getColor(colorKeys.lightBackgroundFill, colorMode)
            : getColor(colorKeys.layoutBoxBackground, colorMode)}
          minH="calc(100vh - 60px)"

        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default AdminLayout