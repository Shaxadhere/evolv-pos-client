import React from "react"
import { Menu, MenuButton, MenuList, MenuItem, Button, Flex, Text, Icon, MenuOptionGroup, MenuDivider, MenuItemOption } from "@chakra-ui/react"
import APP_ICONS from "../../../config/constants/icons"

const MenuDropdown = ({ label, defaultValue, options = [] }) => {
    return (
        <Menu closeOnSelect={false}>
            <MenuButton as={Button} colorScheme='blue'>
                <Flex align="center">
                    <Text>{label}</Text>
                    <Icon ml={2} as={APP_ICONS.DownChevron} />
                </Flex>
            </MenuButton>
            <MenuList minWidth='240px'>
                <MenuOptionGroup defaultValue={defaultValue} title={label} type='radio'>
                    {options.map((item, index) =>
                        <MenuItemOption value={item.value}>{item.label}</MenuItemOption>
                    )}
                </MenuOptionGroup>
                <MenuOptionGroup defaultValue={defaultValue} title={label} type='radio'>
                    {options.map((item, index) =>
                        <MenuItemOption value={item.value}>{item.label}</MenuItemOption>
                    )}
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    )
}

export default MenuDropdown