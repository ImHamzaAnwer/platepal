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
import {debounce} from 'lodash';

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mealInput, setMealInput] = useState('');

  useEffect(() => {
    getCategories();
    // Fetch meals initially with default category 'Beef'
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

  const getMealsBySearch = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealInput}`,
      );
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (e) {
      console.log(e, 'error fetching recipes');
    }
  };

  const debouncedGetMealsBySearch = debounce(getMealsBySearch, 500); // 300ms delay

  const handleChangeCategory = category => {
    setActiveCategory(category);
    setMealInput(''); // Clear search input when category changes
    // Fetch meals only if search input is empty
    if (!mealInput) {
      getMeals(category);
    }
  };

  // Function to handle search input change
  const handleSearchInputChange = text => {
    setMealInput(text);
    if (text === '') {
      // If input is empty, fetch meals based on active category
      getMeals(activeCategory);
    } else {
      // If input is not empty, fetch meals by search
      debouncedGetMealsBySearch();
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
              Savor the Flavor,
            </Text>
            <Text
              className="text-neutral-600 font-bold"
              style={{fontSize: hp(3.8)}}>
              Share the <Text className="text-amber-500">Love</Text>
            </Text>
          </View>
        </View>

        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            value={mealInput}
            onChangeText={handleSearchInputChange}
            placeholder="Search for recipes by name"
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
          {mealInput.length === 0 && categories.length > 0 && (
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
