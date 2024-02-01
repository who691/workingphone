import { StyleSheet, Text, TouchableOpacity, View , TextInput } from 'react-native'
import React,{useState} from 'react'

import auth from '@react-native-firebase/auth'

  import { useNavigation } from '@react-navigation/native'

const Dashboard = () => {


    const navigation=useNavigation();

    const handelLogOut=async()=>{
        try {
            
            await auth().signOut();

            navigation.reset({
                index:0,
                routes: [{name:'login'}]
            })

        } catch (error) {
            console.log(error.message)
        }
    }
    
  return (
    <View style={styles.dashView}>
      <Text style={styles.dashText}>
        Welcome To The  Dashboard
          
          </Text>

          <TouchableOpacity style={styles.btnDash} onPress={handelLogOut}>
    <Text style={styles.btnTextDash}>
Logout
    </Text>
</TouchableOpacity>

    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
    dashView:{
        padding:10,
        backgroundColor:'#bebdb8',
        flex:1
    },
    dashText:{
        fontSize:32,
        marginTop:150,
        marginBottom:40,
        fontWeight:'bold'
    },

    btnDash:{
        padding:10,
        borderRadius:5,
        backgroundColor:'#841584',
        alignItems:'center',
        marginBottom:20,
    },

    btnTextDash:{
  fontSize:22,
  color:'white',
  fontWeight:'bold'
    },
})