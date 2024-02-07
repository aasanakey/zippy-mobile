import { View, StyleSheet, Text } from 'react-native'
import TrackOrder from '../components/TrackOrder'
import OrderList from '../components/OrderList'
import { useAppState } from '../context/appContext'
import { useEffect, useState } from 'react'
import api from '../utils/api'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function TrackParcel() {
    const { user, searchResult } = useAppState()
    const [orders, setOrders] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    useEffect(() => {
        const getOrders = async (pageSize, page) => {
            try {
                const response = await api.get(`api/get_orders?pageSize=${pageSize}&page=${page}`)
                if (response.status == 200) {
                    if (response?.data?.responseCode == "004") {
                        setCurrentPage(response?.data?.currentPage)
                        setTotalPages(response?.data?.totalPages)
                        setOrders(response?.data?.data)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (searchResult) {
            setOrders([searchResult])
        } else {
            getOrders(10)
        }
    }, [searchResult])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.welcomeView}>
                    <Text style={styles.text1}>Hi {user?.name},</Text>
                    <Text style={styles.text2}>Track and monitoring your packages</Text>
                </View>
                <TrackOrder />
                <OrderList data={orders} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        paddingHorizontal: '5%',
        gap: 25,
    },
    welcomeView: {
        paddingVertical: 10
    },
    text1: {
        fontSize: 16,
        color: "#0D2646"
    },
    text2: {
        fontSize: 16,
        color: "#8C8FA5",
    }
})