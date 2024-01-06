import { Image, TouchableOpacity, View,Text } from 'react-native'
import React from 'react'
import { wallpapersStyle } from './styles/Wallpapers.style'
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';


type T_WallpaperProps = {
  wallpaper: any
}

export default function Wallpaper({ wallpaper }: T_WallpaperProps) {

  const router = useRouter();
  const handleWallpaperDetails = () => {
    router.push(`/WallpaperDetails/${wallpaper.id}`)
  }
  return (
    <TouchableOpacity style={wallpapersStyle.wallpaperContainer} onPress={handleWallpaperDetails}>
      <LinearGradient colors={['transparent', 'black']} style={wallpapersStyle.overlay} >
        <Text style={wallpapersStyle.wallpaperName}>
          {wallpaper.name}
        </Text>
      </LinearGradient>
      {/* <Image style={wallpapersStyle.wallpaper} source={{ uri: wallpaper.thumbs.original }} /> */}
    </TouchableOpacity>
  )
}