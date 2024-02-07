import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import Toast from "react-native-root-toast";
import Button from "./Button";
import api from "../utils/api";
import { useAppDispatch } from "../context/appContext";
import { UPDATE_ORDER_SEARCH } from "../utils/constants";

export default function TrackOrder() {
    const [orderId, setOrderId] = useState(null)
    const [searching, setsearching] = useState(false)
    const dispatch = useAppDispatch()
    const search = async () => {
        dispatch({type:UPDATE_ORDER_SEARCH,payload:null})
        try {
            setsearching(true)
            const response = await api.get(`api/get_order_details?orderId=${orderId}`)
            const data = response.data;
            if(data.responseCode === "004"){
                dispatch({type:UPDATE_ORDER_SEARCH,payload:data})
                Toast.show(data.responseDesc);
            }else if(data.responseCode === "005"){
                Toast.show(data.responseDesc);
            }
            console.log(data);
        } catch (error) {
            const response = error.response
            if(response.status == 401){
                Toast.show(response?.data?.message)
            }
        }finally{
            setsearching(false)
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Track You Parcel</Text>
            <Text style={styles.messageText}>Enter your parcel tracking number</Text>
            <View style={styles.inputButtonWrapper}>
                <View style={styles.inputView}>
                    <TextInput style={styles.input} value={orderId}
                        placeholder="Enter Tracking Number" onChangeText={setOrderId}
                    />
                    <FontAwesome style={styles.inputIcon} name="search" size={24} color="#4D4D4E" />
                </View>
                <Button style={styles.button} onPress={search}>
                    {searching ? <ActivityIndicator size={"small"}/> : <Text style={{color:"#FFFFFF"}}>Search Package</Text>}
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 150,
        backgroundColor: "#4CA7A8",
        borderRadius: 12,
        padding: 10,
        rowGap: 10
    },
    titleText: {
        fontSize: 20,
        color: "#FBFBFB",
        fontWeight: "bold"
    },
    messageText: {
        fontSize: 12,
        color: "#FFFFFFB2"
    },
    inputButtonWrapper: {
        width: "100%",
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
    },
    inputView: {
        position: "relative",
        paddingTop:20
    },
    input: {
        backgroundColor: "#FFFCFC",
        color: "#4D4D4E",
        borderWidth: 2,
        borderRadius: 8,
        borderColor: "#FFFCFC",
        paddingVertical: 10,
        paddingLeft: 30
    },
    inputIcon: {
        bottom: "50%",
        left: "3%",
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        minHeight: 50,
        backgroundColor: "#00635C",
        color:"#FFFFFF",
        borderRadius: 8
    }

})