import { Avatar, Flex, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Breadcrumb, BreadcrumbItem, BreadcrumbLink, useColorMode } from '@chakra-ui/react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import React from 'react'
import { getColor, colorKeys } from '../../../config/constants/appColors'
import APP_ICONS from '../../../config/constants/icons'
import { useSelector, useDispatch } from 'react-redux'
import { removeUser } from '../../../config/redux/slices/userSlice'

const Header = ({ disclosure }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const { pathname } = useLocation()
    const splitPath = pathname.split('/')
    const navigate = useNavigate()
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Flex
            as="header"
            align="center"
            justify="space-between"
            w="full"
            px="4"
            minH="60px"
            bg={getColor(colorKeys.layoutHeaderBackground, colorMode)}
            h="14"
            pos="sticky"
            top="0"
            zIndex={99}
        >
            <IconButton
                aria-label="Menu"
                display={{
                    base: "inline-flex",
                    md: "none",
                }}
                onClick={disclosure.onOpen}
                icon={<Icon as={APP_ICONS.MENU} />}
                size="sm"
            />

            <Breadcrumb separator={<Icon display="flex" as={APP_ICONS.RightChevron} color='white' />}>
                <BreadcrumbItem>
                    <BreadcrumbLink fontSize="15px" color="white" as={Link} to="/admin">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                {splitPath.map((item, index) => {
                    if (index < 1 || item === "dashboard") return null
                    const link = splitPath.slice(0, index + 1).join('/')
                    return (
                        <BreadcrumbItem key={index}>
                            <BreadcrumbLink as={Link} fontSize="15px" color="white" to={link} textTransform="capitalize">{item}</BreadcrumbLink>
                        </BreadcrumbItem>
                    )
                })}
            </Breadcrumb>

            <Flex align={"center"}>
                <IconButton size="sm" mr={4} rounded="full" boxSize="6" bg="transparent !important" color="white" onClick={toggleColorMode} as={colorMode === 'light' ? APP_ICONS.DarkMode : APP_ICONS.LighMode}>
                    Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
                </IconButton>
                <Menu>
                    <MenuButton
                        as={Avatar}
                        size="sm"
                        name={user?.name}
                        src={user?.profilePicture}
                        cursor="pointer"
                        className="top-nav-avatar"
                    />
                    <MenuList>
                        {[
                            { name: "Profile", action: () => navigate("/admin/settings/profile") },
                            { name: "Settings", action: () => navigate("/admin/settings") },
                            { name: "Log Out", action: () => dispatch(removeUser()) },
                        ].map((item, index) =>
                            <MenuItem key={index} onClick={item.action}>{item.name}</MenuItem>
                        )}
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    )
}

export default Header