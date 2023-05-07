import React from 'react'

const Card = ({ title, children, titleProps, bodyProps, containerProps }) => {
    return (
        <Card {...containerProps}>
            <CardHeader>
                <Heading size='md' {...titleProps}>{title}</Heading>
            </CardHeader>
            <CardBody {...bodyProps}>
                {children}
            </CardBody>
        </Card>
    )
}

export default Card