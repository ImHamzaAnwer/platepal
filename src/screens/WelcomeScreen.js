/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {
  //   widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, {withSpring, useSharedValue} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => (ring1Padding.value = withSpring(hp(5.3))), 100);
    setTimeout(() => (ring2Padding.value = withSpring(hp(4))), 300);
    setTimeout(() => navigation.navigate('Home'), 2500);
  }, []);

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar barStyle={'light-content'} />
      <Animated.View
        className="bg-white/20 rounded-full"
        style={{padding: ring1Padding}}>
        <Animated.View
          className="bg-white/10 rounded-full"
          style={{padding: ring2Padding}}>
          <Text style={{width: hp(20), height: hp(20)}}>asdasd</Text>
        </Animated.View>
      </Animated.View>

      <View className="flex items-center space-y-2">
        <Text
          style={{fontSize: hp(7)}}
          className="font-bold text-white tracking-widest text-6xl">
          PlatePal
        </Text>
        <Text
          style={{fontSize: hp(2)}}
          className="font-bold text-white tracking-widest text-lg">
          Just a click away
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
