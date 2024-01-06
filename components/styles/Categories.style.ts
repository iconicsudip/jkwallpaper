import { StyleSheet, TextStyle, ViewStyle } from "react-native";

export const categoriesStyle = StyleSheet.create({
    categoriesWrapper: {
        marginTop: 20,
        marginBottom: 10,
        width: "100%",
    },
    categoriesListContainer: {
        columnGap: 8,
    },
    tab:{
        borderWidth: 2,
        borderColor: "#e5e5e5",
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 20,
        fontWeight: "bold",
    },
    tabActive:{
        borderColor:"#FFB534",
        backgroundColor: "#FFB534",
        borderWidth: 2,
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 20,
        fontWeight: 800,
    },
});