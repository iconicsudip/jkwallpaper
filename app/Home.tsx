import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import { Stack } from 'expo-router'
import SearchBar from '../components/SearchBar'
import Cateogries from '../components/Categories'
import Wallpapers from '../components/Wallpapers'
import { defaultStyle } from '../styles/default.style'
import { useEffect, useState } from 'react'
// import {AppOpenAd,BannerAd,TestIds} from 'react-native-google-mobile-ads';

// const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-3334644125943779/7463536944';
export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  return (
    <SafeAreaView
      style={defaultStyle.containerWrapper}
    >
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
      <View style={defaultStyle.container}>
        <SearchBar />
        {/* <BannerAd
          unitId={adUnitId}
          size="SMART_BANNER"
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        /> */}
        {/* <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-3334644125943779/7463536944"
          servePersonalizedAds={false}
          onDidFailToReceiveAdWithError={(e)=>console.log(e)}
        /> */}
        {/* <Cateogries setSelectedCategory={setSelectedCategory}/> */}
        <Wallpapers selectedCategory={selectedCategory} />
      </View>
    </SafeAreaView>
  )
}