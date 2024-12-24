import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { categories } from '@/constants/data';

const Filters = () => {
    const params = useLocalSearchParams<{ filter?: string}>();
    const [selectedCategory, setSelectedCategory] = useState(params.filter || 'All');

    const handleCategoryPress = (category: string) => {
        if (selectedCategory === category){
            setSelectedCategory('All');
            router.setParams({filter: 'All'});
            return;
        }

        setSelectedCategory(category);
        router.setParams({filter: category});
    }

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-3'>
            {categories.map((item, index) => (
                <TouchableOpacity onPress={() => handleCategoryPress(item.category)} key={index} 
                    className={`flex flex-col items-start rounded-full mr-4 px-3 py-1 
                        ${selectedCategory === item.category? ' bg-primary-300' 
                            : 'border-primary-200 border bg-primary-100'
                        }`}
                >
                    <Text
                        className={`text-sm mx-1 ${
                            selectedCategory === item.category
                                ? "text-white font-rubik-bold mt-0.5"
                                : "text-black-300 font-rubik"
                            }`}
                    >{item.title}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default Filters