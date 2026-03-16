import React from 'react';
import {View, TextInput} from 'react-native';
import SearchHeaderStyle from './style';

const SearchHeader = ({value, onChange}) =>{
    return (
        <View style={SearchHeaderStyle.container}>
            <TextInput 
                placeholder="Search Products"
                value={value}
                onChangeText={onChange}
                style={SearchHeaderStyle.input}
            />
        </View>
    )
}
export default SearchHeader;