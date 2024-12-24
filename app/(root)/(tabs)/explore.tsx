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

export default function Explore() {
    const params = useLocalSearchParams<{query?: string; filter?: string;}>();

    const { data: properties, loading, refetch } = useAppwrite({
        fn: getProperties,
        params: {
            filter: params.filter!,
            query: params.query!,
            limit: 20,
        },
        skip: true,
    })

    useEffect(() => {
        refetch({
            filter: params.filter!,
            query: params.query!,
            limit: 20,
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
                        {/* top notification and back button */}
                        <View className="flex flex-row items-center justify-between mt-5">
                            <TouchableOpacity onPress={() => router.back()} 
                                className="flex flow-row bg-primary-200 rounded-full size-11 items-center justify-center">
                                <Image source={icons.backArrow} className='size-7 '/>
                            </TouchableOpacity>
                            <Text className="text-[12px] mr-2 text-center font-rubik-medium text-black-300">
                                Search for Your Ideal Home
                            </Text>
                            <Image source={icons.bell} className='size-7 '/>
                        </View>
                        {/* search bar */}
                        <Search />
                        {/* filters and cards*/}
                        <View className="mt-5">
                            <Filters />
                            <Text className="text-lg font-rubik-bold mt-5 text-black-300 ">
                                Found {properties?.length} Properties
                            </Text>
                        </View>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
