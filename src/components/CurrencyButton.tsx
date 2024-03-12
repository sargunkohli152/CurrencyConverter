import React from 'react';
import type { PropsWithChildren } from 'react';

import {View, Text, StyleSheet} from 'react-native';

type CurrencyButtonProps = PropsWithChildren<{
    name: string;
    flag: string;
}>

const CurrencyButton = (props: CurrencyButtonProps): JSX.Element => {
    return (
        <View style={styles.buttonContainer}>
            <Text style={styles.flag}>{props.flag}</Text>
            <Text style={styles.country}>{props.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    flag: {
        fontSize: 20,
        color: '#FFFFFF',
        marginBottom: 4
    },
    country: {
        fontSize: 10,
        color: '#000000',
        fontWeight: '500'
    }
})

export default CurrencyButton