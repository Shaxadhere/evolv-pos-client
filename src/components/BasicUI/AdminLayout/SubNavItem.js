import { Flex, Icon, useColorMode } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getColor, colorKeys } from "../../../config/constants/appColors";

const SubNavItem = ({ icon, link = "#", title, ...rest }) => {
    const { pathname } = useLocation()
    const isActive = pathname === link
    const { colorMode } = useColorMode()
    return (
        <Flex
            as={Link}
            mx="1.5px"
            my={"1.5px"}
            rounded="none"
            align={"center"}
            cursor="pointer"
            color={isActive
                ? getColor(colorKeys.subNavItemActiveText, colorMode)
                : getColor(colorKeys.secondaryText, colorMode)}
            role="group"
            fontSize={"15px"}
            fontWeight="bold"
            transition=".15s ease"
            to={link}
            p="4px 10px"
            background={isActive && getColor(colorKeys.subNavItemActive, colorMode)}
            _hover={{
                background: getColor(colorKeys.subNavItemActive, colorMode),
                color: getColor(colorKeys.subNavItemActiveText, colorMode)
            }}
            {...rest}
        >
            {icon && (
                <Icon
                    mr={2}
                    boxSize="4"
                    as={icon}
                />
            )}
            {title}
        </Flex>
    );
};

export default SubNavItem