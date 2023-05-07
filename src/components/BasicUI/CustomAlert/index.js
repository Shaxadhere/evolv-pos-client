import React from 'react'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'

const CustomAlert = ({ type, title, description }) => {
    //types: error, info, loading, success, warning
    return (
        <Alert status={type}>
            <AlertIcon />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </Alert>
    )
}

export default CustomAlert