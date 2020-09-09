
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-google-app-auth';
import { withTheme, Appbar, Button, Card, Title, Paragraph, Divider, Badge, Avatar, Caption, Headline, Subheading, Text, TextInput } from 'react-native-paper';
import {
    View,

} from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'

import styles from '../styles/styles'


const validationSchema = Yup.object().shape({

    email: Yup
        .string()
        .required()
        .email()
        .label('Email'),
    password: Yup
        .string()
        .required()
        .label('Password'),

});


WebBrowser.maybeCompleteAuthSession();

const LoginScreen = (props: any) => {
    const dispatch = useDispatch()
    const [result, setResult] = useState(null)

    const signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: `259118067120-s8907ohbkh3385ur1222aed3a1lkumib.apps.googleusercontent.com`,
                iosClientId: `259118067120-28dn6nqgqfjkj1500o3bjnama4h1pa8j.apps.googleusercontent.com`,
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                setResult(result)
                await dispatch(actionCreator.firebaseLogin(result.idToken, 'google'))
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

    return (
        <Formik
            validateonMount={true}
            initialValues={{ email: '', password: '' }}
            onSubmit={values => {
                //console.log(`kat screen : ${JSON.stringify(values)}`)
                const { email, password } = values
                dispatch(actionCreator.login(email, password))
            }}
            validationSchema={validationSchema}
            validateOnMount={true}
            isInitialValid={false}
        >
            {FormikProps => {
                const { email, password } = FormikProps.values
                const emailError = FormikProps.errors.email
                const emailTouched = FormikProps.touched.email
                const passwordError = FormikProps.errors.password
                const passwordTouched = FormikProps.touched.password
                return (
                    <View style={{ flex: 1, padding: 10, justifyContent: 'center', backgroundColor: 'white' }}>


                        <View style={styles.formRowCenter}><Title style={styles.textBigger}>LOG IN</Title></View>
                        <View style={styles.formRow}>
                            <Caption>Email</Caption>
                            <TextInput mode={'flat'} value={email} onChangeText={FormikProps.handleChange('email')} onBlur={FormikProps.handleBlur('email')} />
                            {emailTouched && emailError && <Text style={styles.error}>{emailError}</Text>}
                        </View>
                        <View style={styles.formRow}>
                            <Caption>Password</Caption>
                            <TextInput secureTextEntry mode={'flat'} value={password} onChangeText={FormikProps.handleChange('password')} onBlur={FormikProps.handleBlur('password')} />
                            {passwordTouched && passwordError && <Text style={styles.error}>{passwordError}</Text>}
                        </View>

                        <View style={styles.formRow}>
                            <Button style={{ padding: 10 }} mode={'contained'} onPress={FormikProps.handleSubmit}>LOG IN</Button>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Button 
                              onPress={() => {
                                signInWithGoogleAsync();
            
                            }}
                             icon="google" style={{ padding: 10 }} mode={'contained'}  >GOOGLE LOG IN</Button>
                        </View>
                        <View style={styles.formRow}>
                            <Button mode={'outlined'} onPress={() => props.navigation.navigate(`Registration`)}>Register</Button>
                        </View>
                    </View>
                )
            }}
        </Formik >
    );
}




export default LoginScreen;