import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images';
import icons from '@/constants/icons';
import { Models } from 'react-native-appwrite';

interface Props {
    item: Models.Document;
    onPress?: () => void;
}

export const FeaturedCard = ({item: {image, rating, name, address, price}, onPress}: Props) => {
    return (
        
        <TouchableOpacity onPress={onPress} className='flex flex-col items-start w-60 h-80 relative'>
            <Image source={{uri: image}} className='size-full rounded-2xl'/>
            <Image source={images.cardGradient} className='size-full rounded-2xl absolute bottom-0'/>
            {/* star */}
            <View className='flex flex-row items-center bg-white/90 p-3 py-1.5 rounded-full absolute top-5 right-5'>
                <Image source={icons.star} className='size-3.5 ' />
                <Text className='text-xs font-rubik-bold text-primary-300 ml-1'>{rating}</Text>
            </View>
            {/* department name address and price*/}
            <View className='flex flex-col items-start absolute bottom-5 inset-x-4'>
                <Text className='text-[13px] font-rubik-extrabold text-white' numberOfLines={1}>
                    {name}
                </Text>
                <Text className='text-[11px] font-rubik text-white'>
                    {address}
                </Text>
                <View className='flex flex-row items-center w-full justify-between'>
                    <Text className='text-[13px] font-rubik-extrabold text-white' numberOfLines={1}>
                        ${price}
                    </Text>
                    <Image source={icons.heart} className='size-6' />
                </View>
            </View>

        </TouchableOpacity>
    )   
}

export const Card = ({item: {image, rating, name, address, price}, onPress}: Props) => {
    return (
        <TouchableOpacity className='flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-xl shadow-black-300 relative'>
            {/* star */}
            <View className='flex flex-row items-center px-2 bg-white/90 p-1 rounded-full z-50 absolute top-5 right-5'>
                <Image source={icons.star} className='size-2.5 ' />
                <Text className='text-xs font-rubik-bold text-primary-300 ml-0.5'>{rating}</Text>
            </View>

            <Image source={{uri: image}} className='w-full h-40 rounded-lg' />

            {/* text */}
            <View className='flex flex-col mt-2'>
                <Text className='text-[11px] font-rubik-bold text-black-300'>
                    {name}
                </Text>
                <Text className='text-[8px] font-rubik text-black-200'>
                    {address}
                </Text>
                <View className='flex flex-row items-center mt-2 justify-between'>
                    <Text className='text-[8px] font-rubik-bold text-primary-300' numberOfLines={1}>
                        ${price}
                    </Text>
                    <Image source={icons.heart} className='w-5 h-5 mr-2' tintColor="#191d31" />
                </View>
            </View>
        </TouchableOpacity>    
    )   
}