import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { getlatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
// import seed from "@/lib/seed";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View, TouchableOpacity, ScrollView, FlatList, Button, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

    const { user } = useGlobalContext();
    const params = useLocalSearchParams<{query?: string; filter?: string;}>();

    const { data: latestProperties, loading: latestPropertiesLoading } = useAppwrite({
        fn: getlatestProperties,
    })

    const { data: properties, loading, refetch } = useAppwrite({
        fn: getProperties,
        params: {
            filter: params.filter!,
            query: params.query!,
            limit: 6,
        },
        skip: true,
    })

    useEffect(() => {
        refetch({
            filter: params.filter!,
            query: params.query!,
            limit: 6,
        });
    }, [params.filter, params.query]);

    const handleCardPress = (id: string) => router.push(`/properties/${id}`);

    return (
        <SafeAreaView className="bg-white h-full ">
            {/* <Button title="seed" onPress={seed} /> */}
            <FlatList
                data={properties}
                numColumns={2}
                renderItem={({ item }) => (
                    <Card item = {item} onPress={() => handleCardPress(item.$id)} />
                )}
                keyExtractor={(item) => item.$id}
                contentContainerClassName="pb-32"
                columnWrapperClassName="flex gap-5 px-5"
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    loading ? (
                        <ActivityIndicator size="large" className="text-primary-300 mt-5" />
                    ) : (
                        <NoResults />
                    ) 
                }
                ListHeaderComponent={   
                    <View className="px-5">
                        {/* icon+name+notification */}
                        <View className="flex flex-row items-center justify-between mt-5">
                            {/* user image and name */}
                            <View className="flex flex-row items-center ">
                                <Image source={{uri: user?.avatar}} className='size-12 rounded-full' />
                                <View className="flex flex-col justify-center items-center ml-2">
                                    <Text className='text-xs font-rubik text-black-100'>Good Morning</Text>
                                    <Text className='text-base font-rubik-medium text-black-300'>{user?.name}</Text>
                                </View>
                            </View>
                            {/* bell icon */}
                            <Image source={icons.bell} className='size-7 '/>
                        </View>

                        <Search />

                        {/* featured Card*/}
                        <View className="my-5">
                            {/* heading */}
                            <View className="flex flex-row items-center justify-between">
                                <Text className="text-lg font-rubik-bold text-black-300">
                                    Featured
                                </Text>
                                <TouchableOpacity>
                                    <Text className="text-base font-rubik-bold text-primary-300">See all</Text>
                                </TouchableOpacity>
                            </View>

                            {/* cards */}
                            {latestPropertiesLoading ? (
                                <ActivityIndicator size="large" className="text-primary-300" />
                                ) : !latestProperties || latestProperties.length === 0 ? (
                                    <NoResults /> 
                                ) :(
                                    <FlatList
                                        data={latestProperties}
                                        renderItem={({ item }) => (
                                            <FeaturedCard item={item} onPress={() => handleCardPress(item.$id)}/>
                                        )}
                                        keyExtractor={(item) => item.$id}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerClassName="flex gap-5 mt-5"
                                    />
                                )
                            }
                            
                        </View>

                        {/* our recommendation + filters */}
                        <View className="mt-5">
                            {/* heading */}
                            <View className="flex flex-row items-center justify-between">
                                <Text className="text-lg font-rubik-bold text-black-300">
                                    Our Recommendation
                                </Text>
                                <TouchableOpacity>
                                    <Text className="text-base font-rubik-bold text-primary-300">
                                        See all
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <Filters />
                        </View>

                    </View>
                }
            />
        </SafeAreaView>
    );
}
