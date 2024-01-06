import { Text, FlatList, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { categoriesStyle } from './styles/Categories.style'
import { getAllCategories } from '../api/categories.api'

type T_CategoriesProps = {
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
}

export default function Categories({ setSelectedCategory }: T_CategoriesProps) {
    const [categories, setCategories] = useState(["All"])
    const [activeCategory, setActiveCategory] = useState("All")

    useEffect(() => {
        const allCategories = async () => {
            // const res = await getAllCategories()
            // setCategories([...categories, ...res.data.map((item) => {
            //     return item.name
            // })])
        }
        allCategories()
    }, [])
    return (
        <View style={categoriesStyle.categoriesWrapper}>
            <FlatList
                data={categories}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={activeCategory === item ? categoriesStyle.tabActive : categoriesStyle.tab}
                            onPress={() =>{
                                setActiveCategory(item)
                                setSelectedCategory(item)
                            }}
                        >
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    )
                }}
                contentContainerStyle={categoriesStyle.categoriesListContainer}
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}