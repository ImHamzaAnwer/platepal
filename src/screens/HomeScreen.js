/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StatusBar, Text, View, ScrollView} from 'react-native';
import {
  //   widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Bell} from 'react-native-h'

const HomeScreen = () => {
  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle={'dark-content'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
        className="space-y-6 pt-14">
        <View className="mx-4 flex-row justify-between items-center">

        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
