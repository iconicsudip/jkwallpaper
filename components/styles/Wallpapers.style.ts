import { StyleSheet } from "react-native";

export const wallpapersStyle = StyleSheet.create({
    wallpapersWrapper: {
        marginTop: 20,
        width: "100%",
        flex: 1,
    },
    wallpaperContainer:{
        flex: 1,
        height: 200,
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 8,
        backgroundColor: "#e5e5e5",
        position: "relative",
    },
    wallpapersListContainer: {
        columnGap: 8,
        rowGap: 12,
    },
    wallpaper:{
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        zIndex: 1,
        left: 0,
        bottom: 0,
        padding: 10,
        width: "100%",
        height: 60,
    },
    wallpaperName:{
        fontWeight: "500",
        color: "#ffffff",
        fontSize: 20,
    }
})