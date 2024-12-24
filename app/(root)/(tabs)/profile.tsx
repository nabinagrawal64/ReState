import { View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { settings } from '@/constants/data'
import { useGlobalContext } from '@/lib/global-provider'
import { Logout } from '@/lib/appwrite'

interface SettingsItemProps {
    icon: ImageSourcePropType,
    title: string,
    onPress?: () => void,
    textStyle?: string,
    showArrow?: boolean
}

const SettingsItem = ({ icon, title, onPress, textStyle, showArrow=true, }: SettingsItemProps) => (
    <TouchableOpacity onPress={onPress} className='flex flex-row items-center justify-between py-3 '>
        <View className='flex flex-row items-center gap-3 '>
            <Image source={icon} className='size-6' />
            <Text className={`text-sm font-rubik-medium text-black-300 ${textStyle}`}>{title}</Text>
        </View>

        {showArrow && <Image source={icons.rightArrow} className='size-5' />}
    </TouchableOpacity>
)

const Profile = () => {

    const { user, refetch } = useGlobalContext();

    const handleLogout = async () => {
        try {
            const result = await Logout();
            if(result) {
                refetch();
                Alert.alert('Sucess', 'Logged out successfully');
            }
        } catch (error) {
            console.log('Failed to logout', error);
            Alert.alert('Error', 'An error occurred while logging out');
        }
    }

    return (
        <SafeAreaView className='h-full bg-white'>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-32 px-6"
            >   
            
                {/* profile + bell icon */}
                <View className='flex flex-row items-center justify-between mt-5'>
                    <Text className='text-xl font-rubik-bold'>Profile</Text>
                    <Image source={icons.bell} className='size-7 '/>
                </View>

                {/* image and user name */}
                <View className='flex-row justify-center flex mt-5'>
                    <View className='flex flex-col items-center mt-5 relative'>
                        <Image source={{uri: user?.avatar}} className='size-44 relative rounded-full' />
                        <TouchableOpacity className='absolute bottom-12 right-10'>
                            <Image source={icons.edit} className='size-9' />
                        </TouchableOpacity>
                        <Text className='text-2xl font-rubik-bold mt-2'>{user?.name}</Text>
                    </View>
                </View>

                {/* bookings and payments */}
                <View className='flex flex-col mt-10'>
                    <SettingsItem icon={icons.calendar} title='My Bookings' />
                    <SettingsItem icon={icons.wallet} title='Payments' />  
                </View> 

                {/* profile notification security.... */}
                <View className='flex flex-col mt-3 border-t pt-3 border-primary-200'>
                    {settings.slice(2).map((item, index) => (
                        <SettingsItem key={index} {...item} /> 
                    ))}
                </View> 
                
                {/* logout */}
                <View className='flex flex-col mt-3 border-t pt-3 border-primary-200'>
                    <SettingsItem icon={icons.logout} textStyle='text-danger' title='Logout' showArrow={false} onPress={handleLogout} />  
                </View> 
            </ScrollView>
        </SafeAreaView >
    )
}

export default Profile