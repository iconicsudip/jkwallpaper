import { View, Text, TouchableOpacity, SafeAreaView, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router'
import { FlatList, TextInput } from 'react-native-gesture-handler';
import {
    Ionicons,
} from 'react-native-vector-icons';
import { searchBarStyle } from '../../components/styles/SearchBar.style'
import { defaultStyle } from '../../styles/default.style'
import { debounce } from 'lodash';
import { getAllWallpapers, getWallpapersByQuery } from '../../api/wallpapers.api';
import Empty from '../../components/Empty';

export default function WallpaperByQuery() {
    const router = useRouter();
    const params = useGlobalSearchParams();
    const ref = useRef(null);
    const query = params.query;
    const [searchQuery, setSearchQuery] = useState(query === "" && null);
    const [isFirstPageReceived, setIsFirstPageReceived] = useState(false);
    const [wallpapers, setWallpapers] = useState([]);
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false);
    const searchWallpapers = async (text) => {
        const {data,meta} = await getAllWallpapers(text,page);
        setPage((prev)=>{
            if (meta.current_page === meta.last_page) {
                return null
            }
            return prev+1
        })
        setIsLoading(false)
        setWallpapers([
            ...wallpapers,
            ...data
        ])
        !isFirstPageReceived && setIsFirstPageReceived(true);
    }
    const debouncedSearch = debounce((text,queryType) => {
        // Perform the search operation with 'text'
        setIsLoading(true)
        if(queryType && queryType === "new"){
            setPage(1)
            setWallpapers([])
        }
        searchWallpapers(text)
    }, 500);
    const fetchNextPage = () => {
        console.log(searchQuery)
        if (page!==null && searchQuery) {
            console.log('fetching next page');
            // End of data.
            debouncedSearch(searchQuery);
        }
    };
    const ListEndLoader = () => {
        if (!isFirstPageReceived && page!== null && isLoading) {
            // Show loader at the end of list when fetching next page data.
            return <ActivityIndicator size={'large'} />;
        }
    };
    const handleSearch = (text) => {
        setSearchQuery(text);
        debouncedSearch(text,"new");
    };
    useEffect(() => {
        if (ref.current !== null) {
            console.log('focus')
            ref.current.focus();
        }
    }, [])
    useEffect(() => {
        if (searchQuery === null) {
            setPage(1)
            setWallpapers([])
        }
    }, [query])
    return (
        <SafeAreaView style={defaultStyle.containerWrapper}>
            <Stack.Screen
                options={{
                    headerShadowVisible: false,
                    headerShown: false,
                    headerBackVisible: true,
                    headerBackButtonMenuEnabled: true,
                }}
            />
            <View style={[searchBarStyle.searchBarWrapper, {
                margin: 20,
                marginTop: 60,
                width: "auto"
            }]} >
                <TextInput ref={ref} style={[searchBarStyle.searchBarInput, {
                    color: "#000",
                }]} placeholder='Search wallpaper here...'
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
                <TouchableOpacity style={searchBarStyle.searchBarIcon} onPress={handleSearch}>

                    <Ionicons name="search" size={20} />
                </TouchableOpacity>
            </View>
            <View style={[defaultStyle.container,{
                marginTop:10
            }]}>
                <FlatList
                    ListEmptyComponent={() => {
                        return (
                            <Empty text="No wallpapers found" />
                        )
                    }}
                    nestedScrollEnabled={true}
                    contentContainerStyle={{
                        columnGap: 4,
        rowGap: 8,
                    }}
                    data={wallpapers} // Add your data here
                    keyExtractor={(item) => item?.id.toString()}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={defaultStyle.searchQuery} onPress={() => router.push(`/WallpaperDetails/${item.id}`)}>
                                <Image style={[defaultStyle.wallpaper, {
                                    // width: 120,
                                    height: 120,
                                    borderRadius: 10,
                                }]} source={{ uri: item.thumbs.small }} />
                                {/* <View>
                                    <Text style={[defaultStyle.wallpaperName, {
                                        fontSize: 20,
                                        marginTop: 0
                                    }]}>{item.category}</Text>
                                    {item?.tags && (
                                        <View style={defaultStyle.categoriesContainer}>
                                            <View style={defaultStyle.categories}>
                                                {item?.tags.slice(0, 3)?.map((item: any) => (
                                                    <Text style={defaultStyle.category} key={item.id}>
                                                        {item.name}
                                                    </Text>
                                                ))}
                                            </View>
                                        </View>
                                    )}
                                </View> */}
                            </TouchableOpacity>
                        )
                    }}
                    onEndReached={fetchNextPage}
                onEndReachedThreshold={0.3}
                numColumns={3}
                ListFooterComponent={ListEndLoader}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )
}