import React from 'react'
import { Badge } from '@chakra-ui/react'

const DevicesCount = ({ value }) => {
    return (
        <Badge p={"2px 10px"} textAlign={"center"}>{value}</Badge>
    )
}

export default DevicesCount