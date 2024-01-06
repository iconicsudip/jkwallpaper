import React, { useState, useEffect, useRef } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { wallpapersStyle } from './styles/Wallpapers.style'
import { getAllWallpapers } from '../api/wallpapers.api'
import Wallpaper from './Wallpaper'
import Empty from './Empty'

type T_WallpapersProps = {
    selectedCategory: string
}

export default function Wallpapers({ selectedCategory }: T_WallpapersProps) {
    const [wallpapers, setWallpapers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFirstPageReceived, setIsFirstPageReceived] = useState(false);
    const [page, setPage] = useState(1)
    // const [limit, setLimit] = useState(8)
    const getWallpapers = async () => {
        setIsLoading(true)
        const {data,meta} = await getAllWallpapers(selectedCategory, page)
        setPage((prev)=>{
            if (meta.current_page === meta.last_page) {
                return null
            }
            return prev+1
        })

        // setLimit(res.limit)
        setIsLoading(false)
        setWallpapers(prevWallpapers => [...prevWallpapers, ...data]);
        !isFirstPageReceived && setIsFirstPageReceived(true);
        // console.log(res)
        // setWallpapers(res.data)
    }
    const fetchNextPage = () => {
        console.log('fetching next page');
        if (page!==null) {
            // End of data.
            getWallpapers();
        }
    };
    const ListEndLoader = () => {
        if (!isFirstPageReceived && page!== null && isLoading) {
            // Show loader at the end of list when fetching next page data.
            return <ActivityIndicator size={'large'} />;
        }
    };
    useEffect(() => {
        if(!isFirstPageReceived){
            getWallpapers()
        }
    },[isFirstPageReceived])
    useEffect(() => {
        setPage(1)
        setWallpapers([])
        setIsFirstPageReceived(false)
        // getWallpapers()
    }, [selectedCategory])
    if (!isFirstPageReceived && page===1 && isLoading) {
        // Show loader when fetching first page data.
        return <ActivityIndicator size={'small'} />;
    }
    return (
        <View style={wallpapersStyle.wallpapersWrapper}>
            <FlatList
                nestedScrollEnabled={true}
                // onScrollEndDrag={fetchNextPage}
                data={wallpapers}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={() => {
                    return (
                        <Empty text="No wallpapers found" />
                    )
                }}
                renderItem={({ item }) => {
                    return (
                        <Wallpaper key={item.id} wallpaper={item} />
                    )
                }}
                onEndReached={fetchNextPage}
                onEndReachedThreshold={0.3}
                ListFooterComponent={ListEndLoader}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                columnWrapperStyle={wallpapersStyle.wallpapersListContainer}
            />
        </View>
    )
}
