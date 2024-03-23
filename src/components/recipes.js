/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, {FadeInDown} from 'react-native-reanimated';
import Loading from './loading';
import {useNavigation} from '@react-navigation/native';

export default function Recipes({meals, categories}) {
  const navigation = useNavigation();
  return (
    <View className="mx-4 space-y-3">
      <Text
        style={{fontSize: hp(3)}}
        className="font-semibold text-neutral-600">
        Recipes
      </Text>

      {categories?.length === 0 || meals?.length === 0 ? (
        <Loading size="large" />
      ) : (
        <MasonryList
          data={meals}
          keyExtractor={item => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item, i}) => (
            <RecipeCard navigation={navigation} item={item} index={i} />
          )}
          onEndReachedThreshold={0.1}
          // refreshing={isLoadingNext}
          // onRefresh={() => refetch({first: ITEM_CNT})}
          // onEndReached={() => loadNext(ITEM_CNT)}
        />
      )}
    </View>
  );
}

const RecipeCard = ({item, index, navigation}) => {
  const isEven = index % 2 === 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(10)}>
      <Pressable
        onPress={() => navigation.navigate('RecipeDetails', {...item})}
        style={{
          width: '100%',
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1">
        <Animated.Image
          sharedTransitionTag={item.strMeal}
          source={{uri: item.strMealThumb}}
          style={{
            width: '100%',
            height: index % 3 === 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
        />
        <Text
          style={{fontSize: hp(1.5)}}
          className="font-semibold ml-2 text-neutral-600">
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + '...'
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
