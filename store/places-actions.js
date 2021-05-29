import * as FileSystem from 'expo-file-system';
export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';
export const REMOVE_PLACE = 'REMOVE_PLACE';

import ENV from '../env';
import { insertPlace, fetchPlaces, removePlace } from '../helpers/db';

export const addPlace = (title, image, location) => {
    return async (dispatch) => {

        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`);
        // console.log("Response-----", response);
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const resData = await response.json();
        if (!resData.results) {
            throw new Error('Something went wrong!');
        }

        // console.log("Address---->", resData.results[0].formatted_address);
        const address = resData.results[0].formatted_address;

        // image is the path of the taken Image in temporary Directory
        const fileName = image.split('/').pop();   // file name
        const newPath = FileSystem.documentDirectory + fileName;    // path where image is going to store in phone directory

        try {
            await FileSystem.moveAsync({
                from: image,   // path for source file
                to: newPath   // path for destination file
            })
            const dbResult = await insertPlace(title, newPath, address, location.lat, location.lng);
            // console.log("Place Inserted: ", dbResult);
            dispatch({
                type: ADD_PLACE,
                placeData: {
                    id: dbResult.insertId,
                    title: title,
                    image: newPath,
                    address: address,
                    coords: {
                        lat: location.lat,
                        lng: location.lng
                    }
                }
            })
        } catch (err) {
            console.log("Error in Saving File", err);
            throw err;
        }
    }
};

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces();
            // console.log("Places are ----", dbResult);
            dispatch({ type: SET_PLACES, places: dbResult.rows._array });
        } catch (err) {
            throw err;
        }
    }
};

export const deletePlace = (ids) => {
    return async dispatch => {
        // console.log("ID are--", ids);
        try {
            for (let id = 0; id < ids.length; id++) {    
                await removePlace(ids[id]);
                dispatch({ type: REMOVE_PLACE, placeId: ids[id] });
            }
        } catch (err) {
            throw err;
        }
    }
};