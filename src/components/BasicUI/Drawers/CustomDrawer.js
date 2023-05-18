import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay } from '@chakra-ui/react'
import React from 'react'

const CustomDrawer = ({ isOpen, onClose, heading, children, footer }) => {
    return (
        <Drawer isOpen={isOpen} onClose={onClose} size="sm">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>{heading}</DrawerHeader>
                <DrawerBody>
                    {children}
                </DrawerBody>

                <DrawerFooter>
                    {footer}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default CustomDrawer