import React, { useEffect, useState } from 'react';
import { Platform, Text, View, TextInput, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Box, FormatData, CustomText, TextDefault, TextSmall, SearchBox } from '../components/Custom'
import { LineChart, } from "react-native-chart-kit";

import styles from '../styles/styles'

const web = Platform.OS === 'web'



const Footer = () =>
  <View style={{ flex: 1, borderTopWidth: 1, borderColor: 'lightgrey', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row' }}>
    <TextSmall color={'#1faccf'} >Footer | Footer | Footer    </TextSmall>
    <TextSmall>Copyright 2019 FCGB    </TextSmall>
    <View style={{ flexDirection: 'row' }}>
      <Image source={require('../assets/images/twitter.png')} resizeMode={'contain'} style={{ width: 30, height: 30, marginRight: 10 }} />
      <Image source={require('../assets/images/facebook.png')} resizeMode={'contain'} style={{ width: 30, height: 30, marginRight: 10 }} />
      <Image source={require('../assets/images/instagram.png')} resizeMode={'contain'} style={{ width: 30, height: 30, marginRight: 10 }} />


    </View>
  </View>

const PersonalInfoLite = (props) =>

  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'stretch', alignItems: 'center' }}>
    <Ionicons name="ios-notifications-outline" size={32} color="#fd7e38" style={{ paddingRight: 20 }} />
    <TextDefault style={[ { paddingRight: 20 }]}>Mardhiah</TextDefault>
    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ height: 36, width: 36, borderRadius: 18, paddingRight: 20 }} resizeMode={'cover'} />
  </View>


export { Footer, PersonalInfoLite }