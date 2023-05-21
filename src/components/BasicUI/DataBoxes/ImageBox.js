import React from 'react'
import IMAGES from '../../../config/constants/images'
import { Image } from '@chakra-ui/react';
import Config from '../../../config';

const ImageBox = ({ src, w, h, addBaseUrl = true, objectFit = "cover", fallBackImage = IMAGES.PLACEHOLDER, ...rest }) => {
    return (
        <Image
            src={`${addBaseUrl ? Config.env().CONTAINER + "/" : ""}${src}`}
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