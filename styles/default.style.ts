import { SWIPABLE_BUTTON, SWIPABLE_WIDTH,SWIPABLE_PADDING,SWIPABLE_HEIGHT } from '../components/constants/swipeableButton.constant';
import { StyleSheet } from 'react-native';
export const defaultStyle = StyleSheet.create({
    containerWrapper:{
        flex:1,
        backgroundColor: 'white',
      },
    container:{
        flex:1,
        margin: 20,
        marginTop: 40,
    },
    wallpaper:{
        width: "100%",
        height: 400,
        resizeMode: "cover",
        borderRadius: 10,
    },
    wallpaperName:{
        fontWeight: "700",
        fontSize: 28,
        marginTop: 20,
        marginBottom: 4,
    },
    categoriesContainer:{
        marginTop: 4,
        marginBottom: 10,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flex: 1,
        flexWrap: "wrap",
        paddingTop: 10,
    },
    categoryTitle:{
        fontWeight: "600",
        fontSize: 16,
        marginBottom: 10,
    },
    categories:{
        columnGap: 8,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    category:{
        backgroundColor: "#e5e5e5",
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 15,
        overflow: "hidden",
        fontWeight: "400",
        fontSize: 12,
        color: "#333",
        marginBottom: 8,
    },
    swipeableContainer:{
        width: SWIPABLE_WIDTH - 20,
        height: SWIPABLE_HEIGHT,
        borderRadius: 60,
        padding: SWIPABLE_PADDING,
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffdfa7",
        justifyContent:"center"
    },
    relatedWallpapersTitle:{
        fontWeight: "600",
        fontSize: 20,
        marginTop: 6,
    },
    wallpaperDescription:{
        fontWeight: "300",
        fontSize: 14,
        marginTop: 6,
        color: "#333",
    },
    searchQuery:{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 20,
        overflow: "hidden",
        paddingRight: 8,
        flex:1
    },
    swipeableButton:{
        width: SWIPABLE_BUTTON,
        height: SWIPABLE_BUTTON,
        borderRadius: 60,
        margin: 2,
        backgroundColor: "#ffffff",
        position: "absolute",
        left: 4,
    },
    downloadText:{
        position: "absolute",
        left:0,
        right:0,
        textAlign: "center",
    }
})