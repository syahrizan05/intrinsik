import React, { useState, useEffect } from 'react';
import { Card, Button, Appbar, Searchbar, IconButton } from 'react-native-paper';
import { View, Text, FlatList, Modal, Share } from 'react-native';
import { Capital } from '../db/capital'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import { OneCall, OneCallState, CapitalObject, CapitalObjectReducer, Weather } from '../types';
import styles from '../styles/styles'
import { WeatherDetail } from '../components/Custom';
import moment from 'moment'


const OtherCountryScreen = () => {

    const [filteredCapital, setFilteredCapital] = useState(Capital)
    const [keyword, setKeyword] = useState('')
    const [viewDetail, setViewDetail] = useState(false)
    const [location, setLocation] = useState({ city: '', country: '' })
    const [savedViewCapital, setViewSavedCapital] = useState(true)



    const otherWeatherData: OneCall = useSelector((state: OneCallState) => state.weatherReducer.otherWeatherData, shallowEqual)
    const { savedCapital } = useSelector((state: CapitalObjectReducer) => state.capitalReducer, shallowEqual)



    const share = async (weatherData: OneCall) => {
        try {
            const result = await Share.share({
                message:
                    `City :${location.city},${location.country}\nTime :${moment.unix(weatherData.current.dt).format()}\nTemperature :${weatherData.current.temp}\nCondition :${weatherData.current.weather[0].description}\n `,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionCreator.populateSavedCapital())
    }, []);

    const filterCapital = (val: string) => {
        setKeyword(val)
        setFilteredCapital(Capital.filter(c => c.CapitalName.includes(val)))
    }

    const openDetail = (item: CapitalObject) => {
       
        setLocation({ city: item.CapitalName, country: item.CountryName })
        dispatch(actionCreator.saveCapital(item))


        dispatch(actionCreator.getLocalWeather(item.CapitalLatitude, item.CapitalLongitude, 'otherWeatherData'))
        setViewDetail(!viewDetail)
    }




    return (
        <View style={[styles.container, { flex: 1, }]}>
            <Modal
                visible={viewDetail}
                onRequestClose={() => {
                    console.log('do nothing')
                }}
            >
                {otherWeatherData && <WeatherDetailView location={location} weatherData={otherWeatherData} share={share} setViewDetail={setViewDetail} />}
                <Button onPress={() => share(otherWeatherData)}>SHARE</Button>
            </Modal>
            <Searchbar
                placeholder="Search"
                onChangeText={(val) => filterCapital(val)}
                value={keyword}
                style={styles.pad}
            />
            {(savedCapital?.length > 0) && <Card style={{ margin: 5, borderWidth: 1, borderColor: 'yellow', backgroundColor: 'lightgoldenrodyellow' }}>
                <Card.Title title={'Saved Capital'} titleStyle={styles.textDefault} right={props => <IconButton
                    icon={savedViewCapital ? "arrow-collapse" : "arrow-expand"}
                    //color={'pink'}
                    size={20}
                    onPress={() => setViewSavedCapital(!savedViewCapital)}
                />} />
                {savedViewCapital && <Card.Content>
                    {savedCapital.map((s: CapitalObject, index: number) => <Text key={index.toString()} style={[styles.textDefault, {}]}>{s.CapitalName}</Text>)}
                </Card.Content>}
            </Card>
            }
            <FlatList
                data={filteredCapital}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) =>
                    <Card elevation={2} style={{ margin: 5 }} onPress={() => openDetail(item)}>
                        <Card.Content>
                            <Text style={[styles.textBlue, {}]}>{item.CapitalName}</Text>
                            <Text style={[styles.textDefault, {}]}>{item.CountryName}</Text>
                        </Card.Content>
                    </Card>}
                extraData={filteredCapital}
            />
        </View>
    );

}

const WeatherDetailView = (props: any) => {
    return (<View style={[styles.container, { justifyContent: 'flex-start' }]}>
        <Appbar.Header style={{ alignSelf: 'stretch' }} >
            <Appbar.Action icon="chevron-left" onPress={() => props.setViewDetail(false)} />
            <Appbar.Content title={props.location.city} subtitle={props.location.country} />
        </Appbar.Header>
        <WeatherDetail weatherData={props.weatherData} />
    </View>)
}

export default OtherCountryScreen