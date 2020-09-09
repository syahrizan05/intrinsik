import { StyleSheet } from 'react-native'
import Layout from '../constants/Layout'
import Constants from 'expo-constants';


const fontSize = 14

const elevationShadowStyle = (elevation: number) => {
  return {
    elevation,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation
  };
}


export const styles =
  StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      // alignItems: 'center',
      // justifyContent: 'flex-start',

    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 10,
      height: 1,
      width: '80%',
    },
    textDefault: {
      fontFamily: 'Montserrat_400Regular',
    },
    textSmall: {
      fontFamily: 'Montserrat_400Regular',fontSize:fontSize*0.8
    },
    textBlue: {
      fontFamily: 'Montserrat_400Regular', fontSize, color: '#1faccf'
    },
    textHeader: { fontFamily: 'Montserrat_400Regular', color: '#1faccf' },
    textSubheader: { fontFamily: 'Montserrat_400Regular', color: '#000' },
    shadow: {
      ...elevationShadowStyle(5),
      backgroundColor: 'white' // It'll look weird without a background color!
    },
    box: {
      flex: 1, marginBottom: 10,
    },
    card: {
      flex: 1, marginBottom: 10, padding: 10, borderRadius: 10
    },
    bgWhite: { backgroundColor: '#fff', },
    formRow: { marginBottom: 20 },
    formRowCenter: { marginBottom: 20, alignItems: 'center' },
    //textDefault: { fontFamily: `Montserrat_400Regular` },
    textBigger: { fontFamily: `Montserrat_400Regular`, fontSize: 27 }, bottom: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    },
    pad: { paddingTop: Constants.statusBarHeight }

  });


export default styles