import { Flex, Icon, useColorMode, Button } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getColor, colorKeys } from "../../../config/constants/appColors";
import { toggleSubSider } from "../../../config/redux/slices/settingSlice";

const NavItem = ({ icon, link = "#", title, ...rest }) => {
    const { pathname } = useLocation()
    const isActive = pathname.split("/")[1] === link.split("/")[1]
    const { colorMode } = useColorMode()
    const dispatch = useDispatch()
    return (
        <Flex
            flexDir={"column"}
            as={isActive ? Flex : Link}
            onClick={isActive ? () => dispatch(toggleSubSider()) : null}
            align="center"
            mx="2"
            rounded="md"
            py="4"
            cursor="pointer"
            color={isActive ? getColor(colorKeys.white, colorMode) : getColor(colorKeys.smoke, colorMode)}
            bg={isActive ? getColor(colorKeys.activeNavButton, colorMode) : "transparent"}
            role="group"
            fontSize={"11px"}
            transition=".15s ease"
            to={link}
            _hover={{
                color: "white",
            }}
            {...rest}
        >
            {icon && (
                <Icon
                    m="auto"
                    boxSize="5"
                    _groupHover={{
                        color: "white",
                    }}
                    as={icon}
                />
            )}
            {title}
        </Flex>
    );
};

export default NavItem