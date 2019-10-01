import firebase from '../lib/firebase';

export function writeUserDataLogin(uid, data) {
    if (data.displayName === null && data.email === null && data.photoURL === null) {
        firebase.database().ref(`users/${uid}`).set({
            displayName: data.displayName,
            email: data.email,
            isAnonymous: data.isAnonymous,
            metadata: data.metadata,
            phoneNumber: data.phoneNumber,
            photoURL: "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
            providerData: data.providerData,
            ra: data.ra,
            refreshToken: data.refreshToken,
            u: data.u,
            uid: data.uid,
            _lat: data._lat
        }, function (error) {
            if (error) {
                // console.log(error);
            } else {
                // Data saved successfully!
            }
        });

        // console.log(`displayName: ${displayName}`);

    } else {

        firebase.database().ref(`users/${uid}`).set({
            displayName: data.displayName,
            email: data.email,
            isAnonymous: data.isAnonymous,
            metadata: data.metadata,
            phoneNumber: data.phoneNumber,
            photoURL: data.photoURL,
            providerData: data.providerData,
            ra: data.ra,
            refreshToken: data.refreshToken,
            u: data.u,
            uid: data.uid,
            _lat: data._lat
        }, function (error) {
            if (error) {
                // console.log(error);
            } else {
                // Data saved successfully!
            }
        }
        );
    }


}

export function writeUserDataEdit(uid, data) {
    
    firebase.database().ref(`profile/${uid}/displayName`).set(data.displayName)

    firebase.database().ref(`profile/${uid}/email`).set(data.email)

    firebase.database().ref(`profile/${uid}/photoURL`).set(data.photoURL)

    firebase.database().ref(`profile/${uid}/phoneNumber`).set(data.phoneNumber)

    firebase.database().ref(`profile/${uid}/sex`).set(data.sex)

    firebase.database().ref(`profile/${uid}/age`).set(data.age)
}

export function writeUserDataLocation(uid, coords) {
    firebase.database().ref(`users/${uid}/coords`).set({
        accuracy: coords.accuracy,
        altitude: coords.altitude,
        altitudeAccuracy: coords.altitudeAccuracy,
        heading: coords.heading,
        latitude: coords.latitude,
        longitude: coords.longitude,
        speed: coords.speed
    })
}


export function writeCreateGroupShareUserDataHost(uid, data) {
    firebase.database().ref(`group_share_user/${uid}/host`).set({
        geocoded_waypoints: data.geocoded_waypoints,
        request: data.request,
        routes: data.routes
    })
}

export function writeCreateGroupShareUserDataDateTime(uid, data) {
    firebase.database().ref(`group_share_user/${uid}/date_time`).set(data)
}

export function writeCreateGroupShareUserDataNumberOfTravel(uid, data) {
    firebase.database().ref(`group_share_user/${uid}/number_of_travel`).set(data)
}

export function writeCreateGroupShareUserDataGender(uid, data) {
    firebase.database().ref(`group_share_user/${uid}/gender`).set(data)
}

export function addUserToGroupShareData(uid, user) {
    firebase.database().ref(`group_shareuid/group_share`).push(user);
}

export function writeCreateGroupShareUserDataHeader(uid, data) {
    firebase.database().ref(`group_share_user/${uid}/header`).set(data)
}

export function writeCreateGroupShareUserDataHeaderAndWay(uid, data) {
    firebase.database().ref(`group_share_user/${uid}/header/host`).set(data)
}

export function writeCreateGroupShareUserDataKeys(uid) {
    firebase.database().ref(`group_share_user/keys/${uid}`).set(uid)
}

export function shareLocation(uid, data) {
    firebase.database().ref(`group_share_user/${uid}/share`).set(data)
}

export function joinGroupShare(hid, uid, data) {
    firebase.database().ref(`group_share_user/${hid}/join/user/${uid}`).set(data);

    firebase.database().ref(`group_share_user/${hid}/join/keys/${uid}`).set(uid)
}

export function writeHistory(uid, data) {
    firebase.database().ref(`history/${uid}`).push(data)
}

export function writeMessenger(hid, data) {
    firebase.database().ref(`group_share_user/${hid}/messengers`).push(data)
}