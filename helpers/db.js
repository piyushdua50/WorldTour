import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('MyPlaces.db');   // To create a DB if not exists

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL); ',
                [],
                // Function executed when above query returns Success
                () => {
                    resolve();
                },
                // Function executed when above query returns Error
                (_, err) => {
                    reject(err);
                }
            )
        })
    })
    return promise;
};

export const insertPlace = (title, imageUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?) ',
                [title, imageUri, address, lat, lng],    // parameters values for ?
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            )
        })
    })
    return promise;
};

export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM places',
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            )
        })
    })
    return promise;
};

export const removePlace = (placeId) => {
    // console.log("PlaceId is: ", placeId);
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM places WHERE id=${placeId};`,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            )
        })
    })
    return promise;
};