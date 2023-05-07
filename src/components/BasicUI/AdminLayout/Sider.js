import { Box, Drawer, DrawerContent, DrawerOverlay, Flex, Image, useColorMode } from '@chakra-ui/react';
import React from 'react'
import NavItem from './NavItem';
import { getColor, colorKeys } from "../../../config/constants/appColors"
import APP_ICONS from '../../../config/constants/icons';
import { Link } from 'react-router-dom';
import examSubSiderOptions from '../../../config/constants/examSubsiderOptions';
import lecturesSubsiderOptions from '../../../config/constants/lecturesSubsiderOptions';
import syllabusSubsiderOptions from '../../../config/constants/usersSubsiderOptions';
import SubSider from './SubSider';

const Sider = ({ disclosure }) => {
    const { colorMode } = useColorMode()

    const menuList = [
        {
            icon: APP_ICONS.EXAMS,
            title: "Exams",
            link: "/admin/exams",
            subsider: examSubSiderOptions
        },
        {
            icon: APP_ICONS.COURSES,
            title: "Syllabus",
            link: "/admin/syllabus",
            subsider: syllabusSubsiderOptions
        },
        {
            icon: APP_ICONS.LECTURES,
            title: "Lectures",
            link: "/admin/lectures",
            subsider: lecturesSubsiderOptions
        },
        {
            icon: APP_ICONS.USERS,
            title: "Users",
            link: "/admin/users",
            subsider: examSubSiderOptions
        },
        {
            icon: APP_ICONS.EMAILS,
            title: "Emails",
            link: "/admin/emails",
            subsider: examSubSiderOptions
        },
        {
            icon: APP_ICONS.REPORTS,
            title: "Reports",
            link: "/admin/reports",
            subsider: examSubSiderOptions
        },
        {
            icon: APP_ICONS.BIN,
            title: "Bin",
            link: "/admin/bin",
            subsider: examSubSiderOptions
        },
        {
            icon: APP_ICONS.SETTINGS,
            title: "Settings",
            link: "/admin/settings",
            subsider: examSubSiderOptions
        }
    ]

    const SidebarContent = (props) => (
        <Box
            as="nav"
            pos="fixed"
            top="0"
            left="0"
            zIndex="sticky"
            h="full"
            pb="10"
            overflowX="hidden"
            overflowY="auto"
            bg={getColor(colorKeys.dark, colorMode)}
            w="80px"
            {...props}
        >
            <Flex px="4" h={"60px"} align="center" bg={getColor(colorKeys.layoutHeaderBackground, colorMode)}>
                <Link to="/admin">
                    <Image
                        h="42px"
                        w="42px"
                        src="https://assets.easy-lms.com/ae061a63ecce6a0e67d6d9bf2c5ee596b626a85d/a/main/images/deadlyduck/logos/easy-lms-logo--knowly.svg"
                    />
                </Link>
            </Flex>
            <Flex
                mt={4}
                direction="column"
                as="nav"
                fontSize="sm"
                color="primaryText"
                aria-label="Main Navigation"
            >
                {menuList.map((item, index) =>
                    <NavItem
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        link={item.link}
                        subsider={item.subsider}
                    />
                )}
            </Flex>

            <Flex justifyContent={"center"}>
                <Box w="70%" borderTopWidth={"0.2px"} borderColor={getColor(colorKeys.smoke, colorMode)} />
            </Flex>

            <Flex
                alignItems={"center"}
                justifyContent="space-between"
                mt={4}
                direction="column"
                as="nav"
                fontSize="sm"
                color="primaryText"
                aria-label="Main Navigation"
            >
                <NavItem
                    icon={APP_ICONS.EXAMS}
                    title={"Analyze"}
                    link={"/admin/components"}
                />
            </Flex>

        </Box>
    );
    return (
        <React.Fragment>
            <SidebarContent
                display={{
                    base: "none",
                    md: "unset",
                }}
            />

            {/* <SubSider sidebarOptions={examSubSiderOptions} containerStyles={{ zIndex: 99999 }} /> */}

            <Drawer
                isOpen={disclosure.isOpen}
                onClose={disclosure.onClose}
                placement="left"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <SidebarContent w="full" borderRight="none" />
                </DrawerContent>
            </Drawer>
        </React.Fragment>
    )
}

export default Sider