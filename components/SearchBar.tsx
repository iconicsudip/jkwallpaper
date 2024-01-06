import { View, TouchableOpacity, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { searchBarStyle } from './styles/SearchBar.style'
import {
    Ionicons,
} from 'react-native-vector-icons';
import { useRouter } from 'expo-router';

export default function SearchBar() {
  const router = useRouter();
    const handleSearchPage = () => {
        router.push('/WallpaperByQuery/""')
    }
  return (
    <SafeAreaView>
        <TouchableOpacity style={searchBarStyle.searchBarWrapper} onPress={handleSearchPage}>
            <Text style={searchBarStyle.searchBarInput} >Search wallpaper here...</Text>
            <View style={searchBarStyle.searchBarIcon}>

                <Ionicons name="search" size={20} />
            </View>
        </TouchableOpacity>
    </SafeAreaView>
  )
}