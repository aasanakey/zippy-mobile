import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";
const icon = require("../assets/images/biker.png");

export default function OrderList({ data }) {
  const navigation = useNavigation();
  console.log(data);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <View style={styles.item} key={item.orderId}>
                <Image source={icon} style={styles.itemIcon} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoTitle}>To: {item.receiverName}</Text>
                  <Text
                    style={styles.infoAddress}
                  >{`${item.senderAddress} - ${item.receiverAddress}`}</Text>
                  <Text style={styles.infoTime}>{item.deliveryTime}</Text>
                </View>
                <Text
                  style={[
                    item.status === "Order Received" ? styles.schedulled : null,
                    item.status === "In Transit" ? styles.inTransit : null,
                    item.status === "Order Picked Up" ? styles.delivered : null,
                    item.status === "Cancelled" ? styles.cancelled : null,
                  ]}
                >
                  {item?.status}
                </Text>
              </View>
            );
          }}
          ItemSeparatorComponent={() => <View style={{ height: 16 }}></View>}
          ListEmptyComponent={() => (
            <Text style={styles.infoTitle}>No orders found</Text>
          )}
          ListHeaderComponent={() => (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "#121212", fontWeight: "bold" }}>
                Latest Orders
              </Text>
              <Button onPress={() => navigation.navigate("TrackParcel")}>
                <Text
                  style={{
                    color: "#00A89C",
                    fontSize: 13,
                    textTransform: "capitalize",
                  }}
                >
                  See All
                </Text>
              </Button>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    width: "100%",
    borderWidth: 2,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderColor: "#ffffff",
    paddingVertical: 16,
    paddingHorizontal: 24,
    elevation: 5,
  },
  itemIcon: {
    width: 40,
    height: 40,
    objectFit: "cover",
    backgroundColor: "#1680E414",
    padding: 25,
    borderRadius: 50,
  },
  itemInfoView: {},
  infoTitle: {
    color: "#212121",
    fontWeight: "bold",
    fontSize: 16,
  },
  infoAddress: {
    color: "#616161",
    fontSize: 12,
  },
  infoTime: {
    color: "#1680E4",
    fontSize: 11,
  },
  itemStatus: {
    padding: 50,
    borderRadius: "50%",
    backgroundColor: "#1680E414",
  },
  cancelled: {
    padding: 5,
    color: "rgba(206, 17, 38, 1)",
    backgroundColor: "rgba(206, 17, 38, 0.08)",
  },
  inTransit: {
    padding: 5,
    color: "rgba(252, 209, 22, 1)",
    backgroundColor: "rgba(252, 209, 22, 0.1)",
  },
  cancelled: {
    padding: 5,
    color: "rgba(206, 17, 38, 1)",
    backgroundColor: "rgba(206, 17, 38, 0.08)",
  },
  schedulled: {
    padding: 5,
    color: "rgba(22, 128, 228, 1)",
    backgroundColor: "rgba(22, 128, 228, 0.08)",
  },
  delivered: {
    padding: 5,
    color: "rgba(0, 168, 156, 1)",
    backgroundColor: "rgba(0, 168, 156, 0.08)",
  },
});
