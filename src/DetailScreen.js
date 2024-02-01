import { StyleSheet, Text, TouchableOpacity, View , TextInput } from 'react-native'
import React,{useState} from 'react'

import firestore from '@react-native-firebase/firestore'


const DetailScreen = ({route,navigation}) => {

  const {uid}=route.params
    const [name,setName]=useState('');
    const [dob,setDob]=useState('');
    const [gender,setGender]=useState('');


    const saveDetails=async()=>{
        try {
            
            await firestore().collection('users').doc(uid).set({
                name,
                dob,
                gender
            })

            navigation.navigate('dash')

        } catch (error) {
            console.log(error.message)
        }
    }


  return (
    <View  style={styles.detailView}>
      <Text style={styles.detailText}>
          Enter Your Details  :
      </Text>

      <TextInput placeholder='Enter Your Name' 
value={name} onChangeText={(val)=>setName(val)} style={styles.detailInput} />
      <TextInput placeholder='Enter Your Date Of Birth' 
value={dob} onChangeText={(val)=>setDob(val)} style={styles.detailInput} />
      <TextInput placeholder='Enter Your Gender' 
value={gender} onChangeText={(val)=>setGender(val)} style={styles.detailInput} />

<TouchableOpacity style={styles.btnDetail} onPress={saveDetails}>
    <Text style={styles.btnTextDetail}>
 Confirm Code
    </Text>
</TouchableOpacity>


    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
    detailView:{
        padding:10,
        backgroundColor:'#bebdb8',
        flex:1
    },
    detailText:{
        fontSize:32,
        marginTop:150,
        marginBottom:40,
        fontWeight:'bold'
    },
 detailInput:{
        height:50,
        width:'100%',
        borderColor:'black',
        borderWidth:1,
        marginBottom:30,
        paddingHorizontal:10
    },

    btnDetail:{
        padding:10,
        borderRadius:5,
        backgroundColor:'#841584',
        alignItems:'center',
        marginBottom:20,
    },

    btnTextDetail:{
  fontSize:22,
  color:'white',
  fontWeight:'bold'
    },
})