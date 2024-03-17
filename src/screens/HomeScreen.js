/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StatusBar, Text, View, ScrollView, TextInput} from 'react-native';
import {
  //   widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  BellIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import Categories from '../components/categories';
import axios from 'axios';

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/categories.php',
      );
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (e) {
      console.log(e, 'error fetching categories');
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle={'dark-content'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="space-y-6 pt-14"
        contentContainerStyle={{
          paddingBottom: 50,
        }}>
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <UserCircleIcon size={hp(4)} color={'gray'} />
          <BellIcon size={hp(4)} color={'gray'} />
        </View>
        <View className="mx-4 space-y-2">
          <Text className="text-neutral-600" style={{fontSize: hp(2)}}>
            Hello, Hamza
          </Text>
          <View>
            <Text
              className="text-neutral-600 font-bold"
              style={{fontSize: hp(3.8)}}>
              Make Your Own Food,
            </Text>
            <Text
              className="text-neutral-600 font-bold"
              style={{fontSize: hp(3.8)}}>
              Stay at <Text className="text-amber-500">Home</Text>
            </Text>
          </View>
        </View>

        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search for receipes"
            placeholderTextColor={'gray'}
            style={{fontSize: hp(1.7)}}
            className="flex-1 text-base mb-2 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon
              size={hp(2.5)}
              color={'gray'}
              strokeWidth={3}
            />
          </View>
        </View>

        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
