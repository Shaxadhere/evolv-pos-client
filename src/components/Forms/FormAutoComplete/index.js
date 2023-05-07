import React from 'react'
import { Text, Flex, Avatar,Box } from '@chakra-ui/react'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'


const countries = [
  { value: "ghana", label: "Ghana" },
  { value: "nigeria", label: "Nigeria" },
  { value: "kenya", label: "Kenya" },
  { value: "southAfrica", label: "South Africa" },
  { value: "unitedStates", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "germany", label: "Germany" }
];

export default function App() {
  const [pickerItems, setPickerItems] = React.useState(countries);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const handleCreateItem = (item) => {
    setPickerItems((curr) => [...curr, item]);
    setSelectedItems((curr) => [...curr, item]);
  };

  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };

  const customRender = (selected) => {
    return (
      <Flex flexDir="row" alignItems="center">
        <Avatar mr={2} size="sm" name={selected.label} />
        <Text>{selected.label}</Text>
      </Flex>
    )
  }

  const customCreateItemRender = (value) => {
    return (
      <Text>
        <Box as='span'>Create</Box>
        <Box as='span' bg='red.300' fontWeight='bold'>
          {value}
        </Box>
      </Text>
    )
  }



  return (
          <CUIAutoComplete
            tagStyleProps={{
              display: 'none'
            }}
            listStyleProps={{
                position: 'absolute',
            }}
            placeholder="Type a Country"
            onCreateItem={handleCreateItem}
            items={pickerItems}
            itemRenderer={customRender}
            createItemRenderer={customCreateItemRender}
            selectedItems={selectedItems}
            onSelectedItemsChange={(changes) =>
              handleSelectedItemsChange(changes.selectedItems)
            }
          />
  );
}