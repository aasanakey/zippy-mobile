import { useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
const logo = require('../assets/images/Logo.png')
import Toast from 'react-native-root-toast';
import { useNavigation } from '@react-navigation/native';
import Button from './Button';
import api from '../utils/api';
import { useAppDispatch } from '../context/appContext';
import { SET_TOKEN, SET_USER, UPDATE_AUTH_STATE } from '../utils/constants';

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null)
    const navigation = useNavigation();
    const dispatch = useAppDispatch();

    const submit = async () => {
        try {
            setIsLoading(true)
            const form = { email, password }
            const response = await api.post(`api/login`, form)
            if (response?.status == 201) {
                const data = response.data;
                if (data?.responseCode == "002") {
                    api.interceptors.request.use(function (config) {
                        config.headers["Authorization"] = "Bearer " + data.accessToken;
                        return config;
                    });
                    Toast.show(data.responseDesc, { duration: Toast.durations.LONG })
                    dispatch({type:UPDATE_AUTH_STATE,payload:true})
                    dispatch({ type: SET_TOKEN, payload: data.accessToken })
                    dispatch({type:SET_USER, payload:data.data})
                    navigation.navigate('TrackParcel')
                } else if (data.responseCode === "003") {
                    Alert.alert('Login Error', data.responseDesc)
                } else if (data.statusCode === 400) {
                    Alert.alert('Login Error', data.error)
                }
            }

            console.log(response?.data);
        } catch (error) {
            const response = error?.response;
            console.log(response?.data);
            if (response?.status == 400) {
                Alert.alert('Login Error', response?.data?.error)
            }
            console.log(error);
        } finally {
            setIsLoading(false)
        }

    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Image source={logo} style={styles.logo} />
                <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.text1}>Get started now</Text>
                    <Text style={styles.text2}>Enter your credentials to access your account</Text>
                </View>
                <View style={styles.form}>
                    <View style={{ position: "relative" }}>
                        <Text>Email</Text>
                        <TextInput style={styles.input} inputMode='email' value={email} onChangeText={setEmail} />
                        <FontAwesome style={styles.inputIcon} name="envelope-o" size={24} color="#AFAFAF" />
                    </View>
                    <View style={{ position: "relative" }}>
                        <Text>Password</Text>
                        <TextInput style={styles.input} secureTextEntry={true} value={password} onChangeText={setPassword} />
                        <AntDesign style={styles.inputIcon} name="eyeo" size={24} color="#AFAFAF" />
                    </View>
                    <Button style={styles.button} onPress={() => submit()} >
                        {isLoading ? <ActivityIndicator size={'small'} /> : <Text style={{ color: "#fff" }}>Login</Text>}
                    </Button>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50,
        paddingHorizontal: "5%"
    },
    logo: {
        width: 125,
        height: 68,
        objectFit: "cover"
    },
    text1: {
        color: "#0F0609",
        textTransform: "capitalize",
        fontSize: 24,
        //fontWeight:500
    },
    text2: {
        color: "#7A7A7A",
        fontSize: 16,
        //fontWeight: 400 
    },
    form: {
        gap: 20,
        width: "100%"
    },
    input: {
        width: "100%",
        height: 48,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#D7D7D7",
        paddingVertical: 12,
        paddingLeft: 16,
        paddingRight: 40,
    },
    inputIcon: {
        position: "absolute",
        top: "43%",
        right: "2.5%"
    },
    button: {
        backgroundColor: "#4CA7A8",
        borderRadius: 8,
        paddingHorizontal: 24,
        paddingVertical: 12,
        alignItems: "center",
    }
});