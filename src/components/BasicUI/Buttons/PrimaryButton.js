import { Button, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { getColor, colorKeys } from '../../../config/constants/appColors'

const PrimaryButton = ({ children, ...rest }) => {
    const { colorMode } = useColorMode()
    return (
        <Button
            bg={getColor(colorKeys.primaryButtonFill, colorMode)}
            color={"white"}
            rounded="full"
            fontSize={14}
            _hover={{
                bg: getColor(colorKeys.primaryButtonFillHover, colorMode),
            }}
            _active={{
                bg: getColor(colorKeys.primaryButtonFillHover, colorMode),
            }}
            {...rest}
        >
            {children}
        </Button>
    )
}

export default PrimaryButton