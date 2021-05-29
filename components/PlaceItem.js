import React, { useState, useEffect } from 'react';
import { Alert, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';

const PlaceItem = (props) => {

    const [isSelected, setIsSelected] = useState(false);
    const { id, onDelete } = props;

    const deletePlace = () => {
        if (isSelected) {
            setIsSelected(false);
        } else {
            setIsSelected(true);
        }
        onDelete(id);
    };

    return (
        <TouchableOpacity onPress={props.onSelect} style={{ ...styles.placeItem, backgroundColor: isSelected ? '#ccc' : 'white' }} onLongPress={deletePlace}>
            <Image style={styles.image} source={{ uri: props.image }} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.address}>{props.address}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    placeItem: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#ccc',
        borderColor: Colors.primary,
        borderWidth: 1
    },
    infoContainer: {
        marginLeft: 25,
        width: 230,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    title: {
        color: 'black',
        fontSize: 18,
        marginBottom: 5
    },
    address: {
        color: '#666',
        fontSize: 15
    }
});

export default PlaceItem;
