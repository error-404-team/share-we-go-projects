import firebase from '../lib/firebase';

export function writeUserData(uid, displayName, email, photoURL, phoneNumber, sex, age) {

    if (displayName === null && email === null && photoURL === null) {
        firebase.database().ref(`users/${uid}`).set({
            uid: uid,
            displayName: phoneNumber,
            email: email,
            photoURL: "https://img.icons8.com/metro/52/000000/gender-neutral-user.png",
            phoneNumber: phoneNumber,
            sex:sex,
            age:age
        }, function (error) {
            if (error) {
                console.log(error);
            } else {
                // Data saved successfully!
            }
        });

        // console.log(`displayName: ${displayName}`);

    } else {

        firebase.database().ref(`users/${uid}`).set({
            uid: uid,
            displayName: displayName,
            email: email,
            photoURL: photoURL,
            phoneNumber: phoneNumber
        }, function (error) {
            if (error) {
                console.log(error);
            } else {
                // Data saved successfully!
            }
        }
        );
    }


}

export function writeGEOLocationData(uid, displayName, email, photoURL, phoneNumber, coords, timestamp) {
    firebase.database().ref(`geolocation/${uid}/`).set({
        uid: uid,
        displayName: displayName,
        email: email,
        photoURL: photoURL,
        phoneNumber: phoneNumber,
        coords: {
            accuracy: coords.accuracy,
            altitude: coords.altitude,
            altitudeAccuracy: coords.altitudeAccuracy,
            heading: coords.heading,
            latitude: coords.latitude,
            longitude: coords.longitude,
            speed: coords.speed
        },
        timestamp: timestamp,
    });
    //     console.log(`
    //     writeLocationPrivateData() : {
    //         position: {
    //         lat:${position.lat},
    //         lng:${position.lng}
    //     },
    //     formatted_address:${name_address},
    //     place_id:${place_id}
    // }`);

}

export function writeLocationNearbyUsersData(uid, group_share_id, displayName, photoURL, email, position, name_address) {
    firebase.database().ref(`location_near_by_users/${uid}/${group_share_id}`).set({
        group_share_id: group_share_id,
        lat: position.lat(),
        lng: position.lng(),
        name_address: name_address,
        displayName: displayName,
        photoURL: photoURL,
        email: email
    }
    );
}

export function writeSearchLocationNearbyUsersData(uid, group_share_id, displayName, photoURL, email, position, name_address) {
    firebase.database().ref(`search_location_near_by_users/${uid}/${group_share_id}`).set({
        group_share_id: group_share_id,
        lat: position.lat(),
        lng: position.lng(),
        name_address: name_address,
        displayName: displayName,
        photoURL: photoURL,
        email: email
    }
    );
}

export function writeShareMyWayNearbyUsersData(uid, group_share_id, displayName, photoURL, email, start_position, end_position, start_address, end_address) {
    firebase.database().ref(`share_my_way_near_by_users/${uid}/${group_share_id}`).set({
        group_share_id: group_share_id,
        start_lat: start_position.lat(),
        start_lng: start_position.lng(),
        end_lat: end_position.lat(),
        end_lng: end_position.lng(),
        start_address: start_address,
        end_address: end_address,
        displayName: displayName,
        photoURL: photoURL,
        email: email
    }
    );
}

export function writeDestinationUsersData(uid, position, end_address) {
    firebase.database().ref(`destination_users/${uid}/`).set({
        location_id: uid,
        lat: position.lat(),
        lng: position.lng(),
        end_address: end_address
    }
    );
}

export function writeCreateGroupShareUserData(uid, start_lat, start_lng, end_lat, end_lng, start_address, end_address, start_time, end_time, user_num) {
    firebase.database().ref(`group_share_user/${uid}`).set({
        group_share_id: `${uid}`,
        user_num: user_num,
        start_time: start_time,
        end_time: end_time,
        post_time: `${new Date()}`,
        start_address: start_address,
        end_address: end_address,
        start_lat: start_lat,
        start_lng: start_lng,
        end_lat: end_lat,
        end_lng: end_lng

    });
}

export function addUserToGroupShareData(uid, user) {
    firebase.database().ref(`group_shareuid/group_share`).push(user);
}

