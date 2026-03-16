import React, {useState, useEffect} from 'react';
import {View, Text, Button, FlatList} from 'react-native';

const AddTaskScreen = () =>{

    const [users, setUsers] = useState([]);

    useEffect(()=>{
        getUsers();
    },[]);

    const getUsers = async() => {
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            setUsers(data);
            console.log(data);
        }
        catch(error){
            console.log(error);
        } 
    }

    const LowerFirstLetter = (text) =>{
        if(!text) return;
        return text.charAt(0).toLowerCase() + text.slice(1);
    }

    const renderUser = ({item}) =>{
        return (
            <View style={{padding:10, borderWidth:1, width:'47%',margin:5} }>
                <Text>Name: {(item.name)}</Text>
                <Text>{item.email}</Text>
            </View>

        );
    }
    return (
        <View style={{flex:1}}>
            <Text>Add Task</Text>

            {/* {users && (
                <>
                    users.map( user => ( <Text>Name : {user.name}</Text>))
                </>
            )} */}
            {/* {users.length > 0 && 
                users
                // .filter(user => user.name.includes("L"))
                .map(user => (
                    <View key={user.id}>
                     <Text>Name: {LowerFirstLetter(user.name)}</Text>
                     <Text>Email: {LowerFirstLetter(user.email)}</Text>

                </View>
                ))
            } 
            {users.length > 0 && 
                users.map(user => (
                // <Text key={user.id}>Name: {user.name}</Text>
                <Text key={user.id}>Email: {user.email}</Text>
                ))
            }  */}

            <FlatList 
                data={users}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderUser}
            />


            {/* {users.filter(user => user.email)} */}
            
            <Button
                title='Add'
                // onPress={getUsers}
                
            />
        </View>
    )
}
export default AddTaskScreen;