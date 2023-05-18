import React from 'react'
import IMAGES from '../../../config/constants/images'
import { Image } from '@chakra-ui/react';

const ImageBox = ({ src, w, h, objectFit="cover", fallBackImage = IMAGES.PLACEHOLDER, ...rest }) => {
    return (
        <Image
            src={src}
            w={w}
            h={h}
            objectFit={objectFit}
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallBackImage
            }}
            {...rest}
        />
    )
}

export default ImageBox