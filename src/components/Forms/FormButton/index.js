import { Button, FormControl, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { getColor, colorKeys } from '../../../config/constants/appColors'

const FormButton = ({ children, containerStyles, ...rest }) => {
    const { colorMode } = useColorMode()
    return (
        <FormControl style={{ ...containerStyles }}>
            <Button
                bg={getColor(colorKeys.primary, colorMode)}
                _hover={{
                    bg: getColor(colorKeys.primaryHover, colorMode)
                }}
                _active={{
                    bg: getColor(colorKeys.primaryHover, colorMode)
                }}
                color={getColor(colorKeys.white, colorMode)}
                minW="120px"
                {...rest}
            >
                {children}
            </Button>
        </FormControl>
    )
}

export default FormButton