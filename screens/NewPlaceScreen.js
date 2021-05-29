import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import * as placesActions from '../store/places-actions';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

import Colors from '../constants/Colors';

const NewPlaceScreen = (props) => {
    const [titleValue, setTitleValue] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();

    const dispatch = useDispatch();

    const titleChangeHandler = (text) => {
        setTitleValue(text);
    };

    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(titleValue, selectedImage, selectedLocation));
        props.navigation.goBack();
    };

    const imageTakenHandler = (imagePath) => {
        setSelectedImage(imagePath);
    };

    const locationPickedHandler = useCallback((location) => {
        setSelectedLocation(location);
    }, []);

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.textInput} onChangeText={titleChangeHandler} value={titleValue} />
                <ImagePicker onImageTaken={imageTakenHandler} />
                <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedHandler} />
                {/* As components will not get the navigation props */}
                <Button title="Save Place" color={Colors.primary} onPress={savePlaceHandler} />
            </View>
        </ScrollView>
    )
};

NewPlaceScreen.navigationOptions = {
    headerTitle: 'Add Place'
};

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderColor: '#ccc',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderWidth: 1,
        marginBottom: 20
    }
});

export default NewPlaceScreen;