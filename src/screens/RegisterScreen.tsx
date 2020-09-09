
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native'
import { Button, Card, Title, Caption, TextInput } from 'react-native-paper';
import { Text, View, } from 'react-native';

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
        .label('Password'),
    passwordV: Yup
        .string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),

});

const RegisterScreen = (props) => {
    const dispatch = useDispatch()

    return (
        <Formik
            initialValues={{ email: null, password: null, passwordV: null }}
            onSubmit={values => {
                //console.log(`kat screen : ${JSON.stringify(values)}`)
                const { email, password } = values
                dispatch(actionCreator.register(email, password))
                props.navigation.navigate('RegisterSuccess')
            }}
            validationSchema={validationSchema}
            validateOnMount={true}
                    isInitialValid={false}
        >
            {FormikProps => {
                const { email, password, passwordV } = FormikProps.values
                const emailError = FormikProps.errors.email
                const emailTouched = FormikProps.touched.email
                const passwordError = FormikProps.errors.password
                const passwordTouched = FormikProps.touched.password
                const passwordVError = FormikProps.errors.passwordV
                const passwordVTouched = FormikProps.touched.passwordV
                return (
                    <View style={[styles.container,{ padding: 10, justifyContent: 'center',backgroundColor:'white' }]}>

                        <View style={styles.formRowCenter}><Title style={styles.textBigger}>REGISTER</Title></View>
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
                            <Caption>Password</Caption>
                            <TextInput secureTextEntry mode={'flat'} value={passwordV} onChangeText={FormikProps.handleChange('passwordV')} onBlur={FormikProps.handleBlur('passwordV')} />
                            {passwordVTouched && passwordVError && <Text style={styles.error}>{passwordVError}</Text>}
                        </View>
                        <Caption />
                        <View style={styles.formRow}>
                            <Button style={{ padding: 10 }} mode={'contained'} onPress={FormikProps.handleSubmit}>REGISTER</Button>
                        </View>
                        <View style={styles.formRowCenter}>
                            <Button onPress={() => props.navigation.navigate(`Authentication`)}>Login</Button>
                        </View>
                    </View>
                )
            }}
        </Formik >
    );
}


export default RegisterScreen;