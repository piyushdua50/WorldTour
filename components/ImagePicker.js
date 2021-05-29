import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';

const ImgPicker = (props) => {

    const [pickedImage, setPickedImage] = useState();

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
        if (result.status !== 'granted') {
            Alert.alert('Insufficient Permissions!', 'You need to grant camera permssions to use this App', [{ text: 'Okay' }]);
            return false;
        };
        return true;
    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.5,
            aspect: [16, 9]
        })
        setPickedImage(image.uri);
        props.onImageTaken(image.uri);
    };

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {(!pickedImage)
                    ? (
                        <Text style={styles.text}>No Image picked yet.</Text>
                    )
                    : (
                        <Image style={styles.image} source={{ uri: pickedImage }} />
                    )
                }
                <Button title="Take Image" style={styles.button} color={Colors.primary} onPress={takeImageHandler} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    },
    text: {
        marginVertical: 10
    }
});

export default ImgPicker;