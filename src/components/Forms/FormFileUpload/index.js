import { Input, FormControl, FormLabel, InputGroup, InputLeftElement, FormErrorMessage, Icon } from "@chakra-ui/react";
import { FiFile } from "react-icons/fi";
import { useRef } from "react";

export const FormFileUpload = ({ id, label, value, placeholder, acceptedFileTypes = '', isRequired = false, onChange }) => {
    const inputRef = useRef();
    return (
        <FormControl isRequired={isRequired}>
            {label && <FormLabel htmlFor="writeUpFile">{label}</FormLabel>}
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none">
                    <Icon as={FiFile} />
                </InputLeftElement>
                <input type='file'
                    onChange={(e) => onChange(e.target.files[0])}
                    accept={acceptedFileTypes}
                    name={id}
                    ref={inputRef}
                    style={{ display: 'none' }} />
                <Input
                    cursor={"pointer"}
                    placeholder={placeholder || "Your file ..."}
                    onClick={() => inputRef.current.click()}
                    readOnly={true}
                    value={value && value.id || ''}
                />
            </InputGroup>
        </FormControl>
    );
}


export default FormFileUpload;