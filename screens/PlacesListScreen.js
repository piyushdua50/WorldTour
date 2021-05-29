import React, { useEffect, useState } from 'react';
import { Alert, Platform, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';
import * as placesActions from '../store/places-actions';

const PlacesListScreen = (props) => {
    const [selectedPlaces, setSelectedPlaces] = useState([]);
    const places = useSelector(state => state.places.places);
    const dispatch = useDispatch();

    const deletePlace = () => {
        if (selectedPlaces.length === 0) {
            Alert.alert('Delete Place', 'Select any Place to delete!!', [{ text: "OK" }])
        } else {
            Alert.alert(
                'Delete Place',
                'Are you sure you want to delete this Place?',
                [
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
                    { text: "OK", onPress: () => removeSelectedPlace() }
                ],
                { cancelable: false }
            );
        }
    };

    const removeSelectedPlace = () => {
        dispatch(placesActions.deletePlace(selectedPlaces));
        setSelectedPlaces([]);
    }

    useEffect(() => {
        dispatch(placesActions.loadPlaces());
        props.navigation.setParams({ delete: deletePlace });
    }, [dispatch, selectedPlaces]);

    const deletePlaceHandler = (placeId) => {
        console.log("Place Deleted", placeId);
        const ind = selectedPlaces.indexOf(placeId);
        if (ind === -1) {
            setSelectedPlaces(places => [...places, placeId.toString()]);
        } else {
            selectedPlaces.splice(0, ind);
            setSelectedPlaces(places => [...places]);
        }
    };

    return (
        <FlatList
            keyExtractor={item => item.id}
            data={places}
            renderItem={itemData => (
                <PlaceItem
                    image={itemData.item.imageUri}
                    title={itemData.item.title}
                    address={itemData.item.address}
                    onSelect={() => {
                        props.navigation.navigate('PlaceDetail', {
                            placeTitle: itemData.item.title,
                            placeId: itemData.item.id
                        })
                    }}
                    id={itemData.item.id}
                    onDelete={deletePlaceHandler}
                />
            )}
        />
    )
};

PlacesListScreen.navigationOptions = (navData) => {
    const deletePlaces = navData.navigation.getParam('delete');
    // console.log("Deleted is ", isDeletable);

    return {
        headerTitle: "All Places",
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Delete Place"
                    iconName={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                    onPress={deletePlaces}
                    color='white'
                    disabled={false}
                />
                <Item
                    title="Add Place"
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={() => { navData.navigation.navigate('NewPlace') }}
                    color="white"
                />
            </HeaderButtons>
        )
    }
};

export default PlacesListScreen;