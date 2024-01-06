import { View, Text, SafeAreaView, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useGlobalSearchParams } from 'expo-router'
import { getWallpaperById } from '../../api/wallpapers.api'
import {defaultStyle} from '../../styles/default.style'
import RelatedWallpapers from '../../components/RelatedWallpapers'
import SwipeableDownloadButton from '../../components/SwipeableDownloadButton'

export default function WallpaperDetails() {
  const params = useGlobalSearchParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [wallpaper, setWallpaper] = useState<any>({})
  useEffect(() => {
    const id = params?.id;
    const getWallpaper = async () => {
      setIsLoading(true)
      const res = await getWallpaperById(id);
      setWallpaper(res.data)
      setIsLoading(false)
    }
    getWallpaper()
  },[])
  return (
    <SafeAreaView style={defaultStyle.containerWrapper}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: isLoading ? "Jujutsu" : wallpaper?.name ?? "Jujutsu",
        }}
      />
      <FlatList
        data={wallpaper} // Add your data here
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View style={[defaultStyle.container,{marginTop:0,flex:1}]}>
            <Image style={defaultStyle.wallpaper} source={{ uri: wallpaper.path }} />
            {wallpaper?.name &&
              <Text style={defaultStyle.wallpaperName}>{wallpaper.name}</Text>
            }
            {wallpaper?.tags && (
              <View style={defaultStyle.categoriesContainer}>
                <View style={defaultStyle.categories}>
                  {wallpaper?.tags?.map((item: any) => (
                    <Text style={defaultStyle.category} key={item.id}>
                      {item.name}
                    </Text>
                  ))}
                </View>
              </View>
            )}
            <View>
              <Text style={defaultStyle.relatedWallpapersTitle}>Related Wallpapers</Text>
              <Text style={defaultStyle.wallpaperDescription}>More wallpapers related to this category</Text>
            </View>
            <RelatedWallpapers currentWallpaper={wallpaper}/>
          </View>
        )}
        renderItem={(_) => {
          return <></>
        }}
      />
      
      <SwipeableDownloadButton url={wallpaper.path}/>
    </SafeAreaView>
  )
}