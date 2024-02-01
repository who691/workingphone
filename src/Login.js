import { StyleSheet, Text, TouchableOpacity, View , TextInput } from 'react-native'
import React,{useState,useEffect} from 'react'

import auth from '@react-native-firebase/auth'
  import firestore from '@react-native-firebase/firestore'

  import { useNavigation } from '@react-navigation/native'

  


const Login = () => {

    const [phoneNumber,setPhoneNumber]=useState('');
    const [code,setCode]=useState('')
    const [confirm,setConfirm]=useState(null)

    const [initializing, setInitializing] = useState(true);
  const [userr, setUserr] = useState();


    const navigation=useNavigation();


  // Handle user state changes
  function onAuthStateChanged(userr) {
    setUserr(userr);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!userr) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }


    const signInWithPhone=async()=>{

        try {
            
            const confirmation=await auth().signInWithPhoneNumber(phoneNumber)
  setConfirm(confirmation)
        } catch (error) {
            console.log(error.message)
        }

    }


    const  confirmCode=async()=>{

        try {
            const userCredential=await confirm.confirm(code)
            const user=userCredential.user;
            
            const userDoc=firestore().collection('users').doc(user.uid).get()

            if((await userDoc).exists){
                navigation.navigate('dash')
            }


            else{
                navigation.navigate('detail',{uid:user.uid})
            }
            
        } catch (error) {
            console.log(error.message)
        }


    }

  return (
    <View style={styles.loginView}>
      <Text style={styles.phoneText}>
  PhoneNumber Auth Using Firebase
      </Text>

{
    !confirm ? (
<>

<Text style={styles.phoneInputText}>
    Enter Your Phone Number
</Text>

<TextInput placeholder='Enter Your Phone Number'
 value={phoneNumber} onChangeText={(val)=>setPhoneNumber(val)} style={styles.phoneInput} />


<TouchableOpacity style={styles.btnPhone} onPress={signInWithPhone}>
    <Text style={styles.btnText}>
 Send Code
    </Text>
</TouchableOpacity>


    </> 
    )
     :
  (
    
    <>
    
    <Text style={styles.phoneInputText}>
    Enter The Code Sent To Your Phone
</Text>

<TextInput placeholder='Enter The Code Sent To Your Phone' 
value={code} onChangeText={(val)=>setCode(val)} style={styles.phoneInput} />


<TouchableOpacity style={styles.btnPhone} onPress={confirmCode}>
    <Text style={styles.btnText}>
 Confirm Code
    </Text>
</TouchableOpacity>



    </>
  )
    

}

    </View>
  )
}

export default Login

const styles = StyleSheet.create({

    loginView:{
        padding:10,
        backgroundColor:'#bebdb8',
        flex:1
    },
    phoneText:{
        fontSize:24,
        marginTop:150,
        marginBottom:45,
        fontWeight:'bold'
    },
    phoneInputText:{
        fontSize:18,
        marginBottom:20,
    },
    phoneInput:{
        height:50,
        width:'100%',
        borderColor:'black',
        borderWidth:1,
        marginBottom:30,
        paddingHorizontal:10
    },

    btnPhone:{
        padding:10,
        borderRadius:5,
        backgroundColor:'#841584',
        alignItems:'center',
        marginBottom:20,
    },

    btnText:{
  fontSize:22,
  color:'white',
  fontWeight:'bold'
    },

})