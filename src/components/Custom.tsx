import React, { useEffect, useState } from 'react';
import { Platform, Text, View, TextInput, Image, TouchableOpacity, FlatList, Dimensions, ScrollView, Animated, Easing, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Title, Paragraph, Button, Avatar, Appbar } from 'react-native-paper';
import moment from 'moment'

//import { Card, Box, FormatData, CustomText, TextDefault, TextError, TextHeader, TextSmall, TextSubheader, SearchBox,CustomTextInput, CustomFormAction } from '../components/Custom'
import styles from '../styles/styles'
const web = Platform.OS === 'web'

//KOTAK


const WeatherInfoListItem = (props: { label: string; info: string }) => {
    return (
        <View style={{ margin: 10, padding: 10, alignItems: 'center' }}>
            <Text style={styles.textBlue}>{props.label}</Text>
            <Text style={styles.textDefault}>{props.info}</Text>
        </View>
    )
}

const WeatherDetail = (props) => {

    const [initSatu, setSatu] = useState(new Animated.Value(0))
    const [initDua, setDua] = useState(new Animated.Value(0))
    const [initTiga, setTiga] = useState(new Animated.Value(0))

    const animate = () => {

        Animated.stagger(1000, [
            Animated.timing(initSatu, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(initDua, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(initTiga, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            }),


        ]).start();

    }

    useEffect(() => {
        animate()
    }, []);

    const satu = initSatu.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1,]
    })

    const dua = initDua.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1,]
    })

    const tiga = initTiga.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1,]
    })


    const { weatherData } = props
    return (
        <>
            <ScrollView>
                {/* <Text>{JSON.stringify(address)}</Text> */}

                <Animated.View style={{ padding: 10, justifyContent: 'center', alignItems: 'center', opacity: satu }}>
                    <Image source={{ uri: `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png` }} style={{ height: 50, width: 50 }} resizeMode={'contain'} />
                    <Text style={[styles.textBigger, { textTransform: 'capitalize' }]}>{weatherData.current.weather[0].description}</Text>
                    <Text style={[styles.textBigger]}>{weatherData.current.temp}&deg;C</Text>
                    <Text style={[styles.textDefault]}>(Feels like {weatherData.current.feels_like}&deg;C)</Text>
                    <Text style={[styles.textSmall]}>Last updated at {moment.unix(weatherData.current.dt).format(`h:mm A D/M/YY`)}</Text>

                </Animated.View>
                <Animated.View style={{ opacity: dua }}>
                    <FlatList
                        horizontal
                        data={weatherData.hourly}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            <Card elevation={1} style={{ margin: 5 }}>
                                <Card.Content style={{ alignItems: 'center' }}>
                                    <Image source={{ uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png` }} style={{ height: 50, width: 50 }} resizeMode={'contain'} />
                                    <Text style={styles.textDefault}>{moment.unix(item.dt).format(`h:mm A`)}</Text>
                                    <Text style={[styles.textDefault, { textTransform: 'capitalize' }]}>{item.weather[0].description}</Text>

                                </Card.Content>
                            </Card>}
                    />
                </Animated.View>

                <Animated.View style={{ alignSelf: 'stretch', flexDirection: 'row', opacity: tiga }}>
                    <View style={{ flex: 1 }}>
                        <WeatherInfoListItem label={`Pressure`} info={weatherData.current.pressure + ' hPa'} />
                        <WeatherInfoListItem label={`Humidity`} info={weatherData.current.humidity + '%'} />
                        <WeatherInfoListItem label={`Dew Point`} info={weatherData.current.dew_point + 'C'} />
                        <WeatherInfoListItem label={`UV Index`} info={weatherData.current.uvi + ''} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <WeatherInfoListItem label={`Clouds`} info={weatherData.current.clouds + '%'} />
                        <WeatherInfoListItem label={`Visibility`} info={weatherData.current.visibility + ' m'} />
                        <WeatherInfoListItem label={`Wind Speed`} info={weatherData.current.wind_speed + ' metre/sec'} />
                        <WeatherInfoListItem label={`Wind Degree`} info={weatherData.current.wind_deg + 'C'} />
                    </View>
                </Animated.View>

            </ScrollView>
        </>
    )

}

export { WeatherInfoListItem, WeatherDetail }