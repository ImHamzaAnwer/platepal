/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  StatusBar,
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
import YoutubeIframe from 'react-native-youtube-iframe';
import Animated, {FadeIn, FadeInDown} from 'react-native-reanimated';

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

  function extractYouTubeVideoId(url) {
    const pattern =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(pattern);
    if (match) {
      return match[1]; // Return the first capturing group
    } else {
      return null; // Return null if no match is found
    }
  }

  const ingredientsIndexes = meal => {
    if (!meal) {
      return [];
    }
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal['strIngredient' + i]) {
        indexes.push(i);
      }
    }

    return indexes;
  };

  const item = props.route.params;
  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 30}}>
      <StatusBar barStyle={'dark-content'} />
      <View className="flex-row justify-center">
        <Animated.Image
          sharedTransitionTag={item.strMeal}
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

      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        className="w-full absolute flex-row justify-between items-center pt-14">
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
      </Animated.View>

      {loading ? (
        <Loading size="large" />
      ) : (
        <View className="px-4 flex justify-between space-y-10 pt-8">
          <Animated.View
            entering={FadeInDown.duration(700).springify().damping(12)}
            className="space-y-2">
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
          </Animated.View>

          {/* <Animated.View
            entering={FadeInDown.delay(100)
              .duration(700)
              .springify()
              .damping(12)}
            className="flex-row justify-around">
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
          </Animated.View> */}

          {/* ingredients */}
          <Animated.View
            entering={FadeInDown.delay(200)
              .duration(700)
              .springify()
              .damping(12)}
            className="space-y-4">
            <Text
              style={{fontSize: hp(2.5)}}
              className="font-bold flex-1 text-neutral-700">
              Ingredients
            </Text>
            <View className="space-y-2 flex-row flex-wrap">
              {ingredientsIndexes(mealDetails).map(i => {
                return (
                  <View key={i} className="flex-row space-x-4">
                    {/* <View
                      style={{height: hp(1.5), width: hp(1.5)}}
                      className="bg-amber-300 rounded-full"
                    /> */}
                    <View className="flex-row items-center m-1 bg-amber-300 px-3 py-2 rounded-md">
                      <Text
                        style={{fontSize: hp(1.7)}}
                        className="font-extrabold text-neutral-800">
                        {mealDetails['strMeasure' + i]}{' '}
                      </Text>
                      <Text
                        style={{fontSize: hp(1.7)}}
                        className="font-medium text-neutral-700">
                        {mealDetails['strIngredient' + i]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </Animated.View>

          {/* instructions */}
          <Animated.View
            entering={FadeInDown.delay(300)
              .duration(700)
              .springify()
              .damping(12)}
            className="space-y-4">
            <Text
              style={{fontSize: hp(2.5)}}
              className="font-bold flex-1 text-neutral-700">
              Instructions
            </Text>
            <Text className="text-neutral-700" style={{fontSize: hp(1.8)}}>
              {mealDetails.strInstructions}
            </Text>
          </Animated.View>

          {mealDetails?.strYoutube && (
            <Animated.View
              entering={FadeInDown.delay(400)
                .duration(700)
                .springify()
                .damping(12)}
              className="space-y-4">
              <Text style={{fontSize: hp(2.5)}} className="flex-1 font-bold">
                Recipe Video
              </Text>
              <View>
                <YoutubeIframe
                  videoId={extractYouTubeVideoId(mealDetails?.strYoutube)}
                  height={hp(30)}
                />
              </View>
            </Animated.View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
