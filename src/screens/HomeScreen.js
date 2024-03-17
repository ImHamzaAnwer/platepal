/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StatusBar, Text, View, ScrollView, TextInput} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  BellIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import Categories from '../components/categories';
import axios from 'axios';
import Recipes from '../components/recipes';

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
    getMeals();
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

  const getMeals = async (category = 'Beef') => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (e) {
      console.log(e, 'error fetching recipes');
    }
  };

  const handleChangeCategory = category => {
    getMeals(category);
    setActiveCategory(category);
    setMeals([]);
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

        {/* Categories */}
        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        {/* Recipes */}
        <View>
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
