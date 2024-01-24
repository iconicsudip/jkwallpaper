import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import { Stack } from 'expo-router'
import SearchBar from '../components/SearchBar'
import Cateogries from '../components/Categories'
import Wallpapers from '../components/Wallpapers'
import { defaultStyle } from '../styles/default.style'
import { useEffect, useState } from 'react'
import {BannerAd,BannerAdSize,TestIds} from 'react-native-google-mobile-ads';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-3334644125943779/7463536944';
export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const {top} = useSafeAreaInsets()
  return (
    <View
      style={[defaultStyle.containerWrapper,{paddingTop:top}]}
    >
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
      <View style={{flex:1}}>
        <SearchBar />
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
        {/* <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-3334644125943779/7463536944"
          servePersonalizedAds={false}
          onDidFailToReceiveAdWithError={(e)=>console.log(e)}
        /> */}
        {/* <Cateogries setSelectedCategory={setSelectedCategory}/> */}
        <Wallpapers selectedCategory={selectedCategory} />
      </View>
    </View>
  )
}