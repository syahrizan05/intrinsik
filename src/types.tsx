export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Admin: undefined;
  Info: undefined;
  Authentication: undefined;
  Registration: undefined;
};

export type RegisterParamList = {
  Registration: undefined;
  Register: undefined;
  RegisterSuccess: undefined;

};
export type BottomTabParamList = {
  OtherCountry: undefined;
  Local: undefined;
};

export type HomeParamList = {
  TabOneScreen: undefined;
  Home: undefined;
};



export type OtherCountryParamList = {

  OtherCountry: undefined;

};

//START WEATHER
export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Current {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather[];
}

export interface Minutely {
  dt: number;
  precipitation: number;
}


export interface Hourly {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather[];
  pop: number;
}

export interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}



export interface Daily {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: Temp;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather[];
  clouds: number;
  pop: number;
  uvi: number;
  rain?: number;
}

export interface OneCall {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: Current;
  minutely: Minutely[];
  hourly: Hourly[];
  daily: Daily[];
}


export interface OneCallState {
  weatherReducer: {
    weatherData?: OneCall;
    otherWeatherData?: OneCall;
  }

}


export interface AddressObject {
  street: string;
  postalCode: string;
  city: string;
  region: string;
  name: string;
  country: string;
  isoCountryCode?: string;

}

export interface Coords {
  altitude: number;
  altitudeAccuracy?: number;
  latitude: number;
  accuracy?: number;
  longitude: number;
  heading: number;
  speed: number;
}

export interface LocationObject {
  coords: Coords;
  timestamp: number;
}

export interface CapitalObject {
  CountryName: string,
  CapitalName: string,
  CapitalLatitude: string|number,
  CapitalLongitude: string|number,
  CountryCode?: string|null,
  ContinentName: string
}

export interface CapitalObjectReducer {
  capitalReducer: Capital
}
//// END WEATHER

///START WEATHER REDUCER

export const SET_WEATHER_DATA = 'SET_WEATHER_DATA'
export const RESET_WEATHER_DATA = 'RESET_WEATHER_DATA'

interface SetWeatherAction {
  type: typeof SET_WEATHER_DATA
  payload: OneCall
}

interface ResetWeatherAction {
  type: typeof RESET_WEATHER_DATA
  meta: {
    timestamp: number
  }
}

export type WeatherActionType = SetWeatherAction | ResetWeatherAction



