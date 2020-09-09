import * as firebase from 'firebase';
import moment from 'moment'
import * as Updates from 'expo-updates';

import "firebase/firestore";
import "firebase/auth";

import { OneCall, WeatherActionType, SET_WEATHER_DATA, RESET_WEATHER_DATA } from '../../types';


// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDDHV_Ahb_ZxUhakF5gOTMbnUTva7CI0Ow",
    authDomain: "syah-190f4.firebaseapp.com",
    databaseURL: "https://syah-190f4.firebaseio.com",
    projectId: "syah-190f4",
    storageBucket: "syah-190f4.appspot.com",
    messagingSenderId: "745146460759",
    appId: "1:745146460759:web:260d7f4365065020281112",
    measurementId: "G-DG3E5759TR"
};

//var conf=
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

var db = firebase.firestore();



export const register = (email:string, password:string) => {
    return (dispatch, getState) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((data) => {
             console.log(`registration success`)
            })
            .catch((error) => {
                console.log('Registration Error', error.message);
            });
    }
}



export const login = (email: string, password: string) => {
    return (dispatch: any, getState: any) => {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error: any) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            errorMessage && console.log(error.message)
            // ...
        });
    }
}


export const firebaseLogin = (token, provider) => {
    return (dispatch: any, getState: any) => {
        // Build Firebase credential with the Facebook access token.

        if (provider === 'google') {
            const credential = firebase.auth.GoogleAuthProvider.credential(token);

            // Sign in with credential from the Facebook user.
            firebase.auth().signInWithCredential(credential).catch((error) => {
                // Handle Errors here.
                console.log(`error ialah ${error}`)

            });
        } else if (provider === 'facebook') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token);

            // Sign in with credential from the Facebook user.
            firebase.auth().signInWithCredential(credential).catch((error) => {
                // Handle Errors here.
                console.log(`error ialah ${error}`)

            });
        }

    }
}





export const checkSignIn = () => {
    return (dispatch, getState) => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                var uid = user.uid;
                dispatch({ type: 'SET_STATUS', payload: { loggedIn: true, uid, email: user.email } })

            } else {
                dispatch({ type: 'SET_STATUS', payload: { loggedIn: false, uid: null, email: null } })
            }
        });
    }
}


export const signOut = () => {
    return async (dispatch, getState) => {
        firebase.auth().signOut().then(async () => {

            dispatch({ type: 'RESET_DATA' })
            Updates.reloadAsync()

        }).catch(function (error) {
            // An error happened.
        });
    }
}



export const getLocalWeather = (latitude: number, longitude: number, type: string) => {
    return async (dispatch: any, getState: any) => {
        await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=cd71d70fffd37ccad53c2df42c1a9596&units=metric`, {
            method: 'GET',       
        }).then((response) => response.json())
            .then(async (responseJson) => {

                const data: OneCall = await responseJson

                type === 'weatherData' ? await dispatch({ type: SET_WEATHER_DATA, payload: { weatherData: data } })
                    : await dispatch({ type: SET_WEATHER_DATA, payload: { otherWeatherData: data } })
            })
            .catch((error) => {
                console.log('local weather : ' + error);
            });
    }
}


export const saveCapital = item => {
    return async (dispatch: any, getState: any) => {

        const { uid } = getState().connectionReducer
        uid && db.collection(`savedCapital`).add({
            ...item,
            savedBy: uid,
            timestamp: moment().format()

        }).then(() => console.log('added'))
            .catch((error: any) => {
                console.error("Error adding document: ", error);
            })

    }
}


export const populateSavedCapital = () => {
    return (dispatch: any, getState: any) => {
        const { uid } = getState().connectionReducer
        uid && db.collection("savedCapital")
            .where('savedBy', '==', uid)
            .onSnapshot(function (querySnapshot: any) {
                const savedCapital: any = [];
                querySnapshot.forEach(function (doc: any) {
                    savedCapital.push(doc.data());
                });
                dispatch({ type: 'POPULATE_CAPITAL', payload: { savedCapital } })

            });
    }
}


