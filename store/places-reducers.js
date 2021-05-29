import { ADD_PLACE, SET_PLACES, REMOVE_PLACE } from "./places-actions";
import Place from '../models/place';

const initialState = {
    places: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PLACES:
            return {
                places: action.places.map(place => new Place(
                    place.id.toString(),
                    place.title,
                    place.imageUri,
                    place.address,
                    place.lat,
                    place.lng
                ))
            }
        case ADD_PLACE:
            const newPlace = new Place(
                action.placeData.id.toString(),
                action.placeData.title,
                action.placeData.image,
                action.placeData.address,
                action.placeData.coords.lat,
                action.placeData.coords.lng
            );
            return {
                places: state.places.concat(newPlace)
            }
        case REMOVE_PLACE:
            const placeId = action.placeId;
            // console.log("Place Id------------", placeId);
            const newPlaces = state.places.filter(place => place.id !== placeId);
            return {
                places: newPlaces
            }
        default:
            return state;
    }
};