
import React, { useEffect, useState } from 'react';
import { Button, Card, Title, Caption } from 'react-native-paper';
import { Text, View, } from 'react-native';


import styles from '../styles/styles'



const RegisterSuccessScreen = (props) => {

    return (
        <View style={[styles.container, { padding: 10, justifyContent: 'center', backgroundColor: 'white' }]}>
            <View style={styles.formRowCenter}>
                <Title>REGISTER SUCCESS</Title>
            </View>
            <View style={styles.formRow}>
                <Button style={{ padding: 10 }} mode={'contained'}
                    onPress={() => props.navigation.reset({ index: 0, routes: [{ name: 'Root' }], })}>CONTINUE</Button>
            </View>
        </View>
    );
}


export default RegisterSuccessScreen;