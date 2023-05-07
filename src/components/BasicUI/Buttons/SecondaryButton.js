import { Button, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { getColor, colorKeys } from '../../../config/constants/appColors'

const SecondaryButton = ({ children, ...rest }) => {
    const { colorMode } = useColorMode()
    return (
        <Button
            bg={getColor(colorKeys.lightBackgroundFill, colorMode)}
            color={getColor(colorKeys.lightBackgroundFill, colorMode)}
            rounded="full"
            fontSize={14}
            _hover={{
                bg: getColor(colorKeys.gray, colorMode),
                color: getColor(colorKeys.whiteSmoke, colorMode)
            }}
            _active={{
                bg: getColor(colorKeys.gray, colorMode),
                color: getColor(colorKeys.whiteSmoke, colorMode)
            }}
            {...rest}
        >
            {children}
        </Button>
    )
}

export default SecondaryButton