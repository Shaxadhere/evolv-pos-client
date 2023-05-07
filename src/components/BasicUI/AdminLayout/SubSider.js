import { Box, Flex, Heading, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { getColor, colorKeys } from "../../../config/constants/appColors"
import SubNavItem from './SubNavItem'
import { useSelector } from 'react-redux'
import { DEFAULT_HIDDEN_SIDEBAR_PAGES } from '../../../config/constants'

const SubSider = ({ containerStyles, sidebarOptions, title }) => {
    const { colorMode } = useColorMode()
    const { pathname } = useLocation()
    const { showSubsider } = useSelector((state) => state.setting)
    return (
        <Box
            as="nav"
            pos="fixed"
            top="60px"
            left="80px"
            zIndex="sticky"
            h="full"
            p="0 .5rem"
            overflowX="hidden"
            overflowY="auto"
            boxShadow={"inset 0 2px 6px rgb(51 51 51 / 14%)"}
            bg={getColor(colorKeys.lightBackgroundFill, colorMode)}

            w="240px"
            display={{
                base: "none", md: !showSubsider
                    ? DEFAULT_HIDDEN_SIDEBAR_PAGES.includes(pathname)
                        ? "none"
                        : "block"
                    : "none"
            }}
            {...containerStyles}
        >
            <Heading
                color={getColor(colorKeys.secondaryText, colorMode)}
                fontSize="13px"
                p="15px 15px 7.5px"
            >
                {title}
            </Heading>

            <Flex
                mt={4}
                direction="column"
                as="nav"
                fontSize="sm"
                color="primaryText"
                aria-label="Main Navigation"
            >
                {sidebarOptions?.map((item, index) =>
                    <SubNavItem
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        link={item.link}
                    />
                )}
            </Flex>
        </Box>
    )
}

export default SubSider