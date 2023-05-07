import { Badge } from '@chakra-ui/react'
import React from 'react'

const StatusBadge = ({ value }) => {
    return (
        <Badge colorScheme={value === 1 ? "green" : "red"}>{value === 1 ? "Active" : "Inactive"}</Badge>
    )
}

export default StatusBadge