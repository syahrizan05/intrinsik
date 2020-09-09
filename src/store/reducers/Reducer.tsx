import { combineReducers } from "redux";
import { OneCall, WeatherActionType, SET_WEATHER_DATA, RESET_WEATHER_DATA } from '../../types';
import { sampleWeatherData } from '../../db/sampleWeatherData'

const capitalReducer = (state = [], action: any) => {
    switch (action.type) {
        case 'POPULATE_CAPITAL':
            return { ...state, ...action.payload }
        case 'RESET_DATA':
            return state = []
        default:
            return state
    }
}



const connectionReducer = (state = { loggedIn: true }, action) => {
    switch (action.type) {

        case 'SET_STATUS':
            return { ...state, ...action.payload }

        case 'REGISTRATION_RESET':
            return state = []
        default:
            return state
    }
}


const weatherReducer = (state = { weatherData: sampleWeatherData }, action: WeatherActionType): OneCall | [] => {
    switch (action.type) {
        case SET_WEATHER_DATA:
            return { ...state, ...action.payload }
        case RESET_WEATHER_DATA:
            return state = []
        default:
            return state
    }
}



const appReducer = combineReducers({ capitalReducer, weatherReducer, connectionReducer });

const rootReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'ROOT_LOG_OUT':
            return { state: undefined }
        default:
            return appReducer(state, action)
    }
}

export default rootReducer