/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ChevronLeftIcon, ClockIcon} from 'react-native-heroicons/outline';
import {
  FireIcon,
  HeartIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Loading from '../components/loading';

export default function RecipeDetailScreen(props) {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [mealDetails, setMealDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealDetails();
  }, []);

  const getMealDetails = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`,
      );
      if (response && response.data) {
        setMealDetails(response.data.meals[0]);
      }
    } catch (e) {
      console.log(e, 'error fetching meal details');
    } finally {
      setLoading(false);
    }
  };

  const item = props.route.params;
  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 30}}>
      <StatusBar barStyle={'dark-content'} />
      <View className="flex-row justify-center">
        <Image
          source={{uri: item.strMealThumb}}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 53,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4,
          }}
        />
      </View>

      <View className="w-full absolute flex-row justify-between items-center pt-14">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full bg-white ml-4">
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={2} color={'#fbbf24'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFavorite(!isFavorite)}
          className="p-2 rounded-full bg-white mr-5">
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={2}
            color={isFavorite ? 'red' : 'gray'}
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loading size="large" />
      ) : (
        <View className="px-4 flex justify-between space-y-4 pt-8">
          <View className="space-y-2">
            <Text
              className="flex-1 font-bold text-neutral-700"
              style={{fontSize: hp(3)}}>
              {mealDetails?.strMeal}
            </Text>
            <Text
              className="flex-1 font-medium text-neutral-500"
              style={{fontSize: hp(2)}}>
              {mealDetails?.strArea}
            </Text>
          </View>

          <View className="flex-row justify-around">
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{width: hp(6.5), height: hp(6.5)}}
                className="bg-white rounded-full flex items-center justify-center">
                <ClockIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  className="font-medium text-neutral-700"
                  style={{fontSize: hp(2)}}>
                  35
                </Text>
                <Text
                  className="font-medium text-neutral-700"
                  style={{fontSize: hp(1.4)}}>
                  mins
                </Text>
              </View>
            </View>

            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{width: hp(6.5), height: hp(6.5)}}
                className="bg-white rounded-full flex items-center justify-center">
                <UsersIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  className="font-medium text-neutral-700"
                  style={{fontSize: hp(2)}}>
                  03
                </Text>
                <Text
                  className="font-medium text-neutral-700"
                  style={{fontSize: hp(1.4)}}>
                  servings
                </Text>
              </View>
            </View>

            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{width: hp(6.5), height: hp(6.5)}}
                className="bg-white rounded-full flex items-center justify-center">
                <FireIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  className="font-medium text-neutral-700"
                  style={{fontSize: hp(2)}}>
                  103
                </Text>
                <Text
                  className="font-medium text-neutral-700"
                  style={{fontSize: hp(1.4)}}>
                  calories
                </Text>
              </View>
            </View>

            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{width: hp(6.5), height: hp(6.5)}}
                className="bg-white rounded-full flex items-center justify-center">
                <Square3Stack3DIcon
                  size={hp(4)}
                  strokeWidth={2.5}
                  color={'#525252'}
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  className="font-medium text-neutral-700"
                  style={{fontSize: hp(1.4)}}>
                  Easy
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
