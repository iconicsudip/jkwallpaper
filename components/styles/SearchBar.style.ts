import { StyleSheet } from "react-native";

export const searchBarStyle = StyleSheet.create({
    searchBarWrapper:{
        width: "100%",
        backgroundColor: "#ffffff",
        borderColor: "#e5e5e5",
        borderWidth: 2,
        borderRadius: 60,
        position: "relative",
        height: 50,
        display: "flex",
        flexDirection: "row",
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    searchBarInput : {
        width: "100%",
        paddingVertical: 8,
        paddingLeft: 20,
        paddingRight: 60,
        fontSize: 16,
        color: "#a8a8a8",
    },
    searchBarIcon : {
        position:"absolute",
        right: 0,
        width: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 4,
        backgroundColor: "#FFB534",
        borderRadius: 50,
        top:0,
        bottom:0,
        // transform: [{translateY: -10}],
    }
});