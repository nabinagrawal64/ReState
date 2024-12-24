import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { Login } from '@/lib/appwrite'
import { useGlobalContext } from '@/lib/global-provider'
import { Redirect } from 'expo-router'

const SignIn = () => {
    const { refetch, loading, isLoggedIn } = useGlobalContext();

    if(!loading && isLoggedIn) return <Redirect href="/" />

    const handleLogin = async() => {
        const result = await Login();

        if(result){
            console.log('Login successful', result);
            refetch();
        }else {
            console.log('Login failed');
            Alert.alert('Error', 'Login failed');
        }
    }

    return (
        <SafeAreaView className='bg-white h-full mt-1'>
            <ScrollView contentContainerClassName='h-full'>
                <Image source={images.onboarding} className='w-full h-[63%]' resizeMode="contain" />
                {/* div */}
                <View className='p-2'>
                    {/* p or h */}
                    <Text className='text-base uppercase font-rubik text-black-200 text-center'>
                        Welcome to Restate
                    </Text>
                    <Text className="text-2xl font-rubik-bold text-black-300 text-center mt-2">
                        Let's Get You Closer To {"\n"}
                        <Text className="text-primary-300">Your Ideal Home</Text>
                    </Text>
                    <Text className="text-sm font-rubik text-black-200 text-center mt-10">
                        Login to Real Scout with Google
                    </Text>

                    {/* button */}
                    <TouchableOpacity 
                        onPress={handleLogin} 
                        className="bg-white shadow-md shadow-zinc-800 rounded-full w-full py-4 mt-3"
                    >
                        <View className="flex flex-row items-center justify-center">
                            <Image
                                source={icons.google}
                                className="w-6 h-6"
                                resizeMode="contain"
                            />
                            <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                                Continue with Google
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn