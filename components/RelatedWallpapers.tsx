import React, { useState, useEffect, useRef } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { wallpapersStyle } from './styles/Wallpapers.style'
import { getAllWallpapers } from '../api/wallpapers.api'
import Wallpaper from './Wallpaper'
import Empty from './Empty'

type T_WallpapersProps = {
    currentWallpaper: any,
    selectedCategory?: Array<string>
}

export default function RelatedWallpapers({ currentWallpaper,selectedCategory }: T_WallpapersProps) {
    const [wallpapers, setWallpapers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFirstPageReceived, setIsFirstPageReceived] = useState(false);
    const [page, setPage] = useState(1)
    // const [limit, setLimit] = useState(8)
    const getWallpapers = async () => {
        setIsLoading(true)
        const allTags = currentWallpaper.tags.map((item: any) => {
            return item.name
        })
        const combineTags = allTags.join('+')
        const {data,meta} = await getAllWallpapers(combineTags, page)
        setPage((prev)=>{
            if (meta.current_page === meta.last_page) {
                return null
            }
            return prev+1
        })
        setIsLoading(false)
        setWallpapers(prevWallpapers => [...prevWallpapers, ...data]);
        !isFirstPageReceived && setIsFirstPageReceived(true);
        // const wallpapersPromises = selectedCategory?.map(async (item: any) => {
        //     if(item !== undefined){
        //         const res = await getAllWallpapers(item, page)
        //         return res
        //     }
        // })
        // if(wallpapersPromises !== undefined){
        //     const wallpapers = await Promise.all(wallpapersPromises)
        //     const wallpapersFlatten = wallpapers.flat()
        //     wallpapersFlatten.forEach((item: any) => {
        //         setPage(item.isNextPage ? item.nextPage : null)
        //         // setLimit(item.limit)
        //     })
        //     const wallpapersData = wallpapersFlatten?.map((item: any) => {
        //         return item.data
        //     }).flat()
        //     // setPage(res.isNextPage ? res.nextPage : null)
        //     // setLimit(res.limit)
        //     setIsLoading(false)
        //     // setWallpapers(prevWallpapers => [...prevWallpapers, ...wallpapersData]);
        //     !isFirstPageReceived && setIsFirstPageReceived(true);
        // }
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
        // setLimit(8)
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
                    if(currentWallpaper.id === item.id){
                        return <></>
                    }
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
