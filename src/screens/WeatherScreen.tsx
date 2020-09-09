import React, { useState, useEffect } from 'react';
import { Appbar } from 'react-native-paper';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import { OneCall, OneCallState, AddressObject, LocationObject } from '../types';
import styles from '../styles/styles'
import { WeatherDetail, } from '../components/Custom';

const WeatherScreen = () => {

    const dispatch = useDispatch()
    const [locationSet, setLocationSet] = useState(false);
    const [address, setAddress] = useState([{ street: '', city: '', region: '', postalCode: '', country: 'Malaysia' }]);
    const weatherData: OneCall = useSelector((state: OneCallState) => state.weatherReducer.weatherData, shallowEqual)
    const { email } = useSelector((state: any) => state.connectionReducer, shallowEqual)


    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
            }
            if (!locationSet) {
                const locationObject: LocationObject = await Location.getCurrentPositionAsync();    //getCurrentPositionAsync

                const { coords } = locationObject
                const { latitude, longitude } = coords
                const address: Array<AddressObject> = await Location.reverseGeocodeAsync({ latitude, longitude });    //getCurrentPositionAsync


                setAddress(address)
                setLocationSet(!locationSet)

                dispatch(actionCreator.getLocalWeather(latitude, longitude,'weatherData'))
            }


        })();
    }, [locationSet]);


    if (weatherData) {
        return (
            <View style={[styles.container, { justifyContent: 'flex-start' }]}>
                <Appbar.Header style={{ alignSelf: 'stretch' }} >
                    <Appbar.Content title={address[0]?.city} subtitle={address[0]?.country} />
                    <Appbar.Action icon="logout" onPress={() => dispatch(actionCreator.signOut())} />
                </Appbar.Header>
                {email && <Text style={[styles.textSmall,{alignSelf:'center'}]}>Welcome {email}</Text>}
                <WeatherDetail weatherData={weatherData} />
            </View>
        );
    } else {
        return (<View />)

    }

}

export default WeatherScreen


