import React from 'react';
import * as firebase from 'firebase';

export function writeUserData(userId, displayName, email, photoURL, phoneNumber) {
  if (displayName === null && email === null && photoURL === null) {
    firebase
      .database()
      .ref(`users/${userId}`)
      .set(
        {
          userId: userId,
          displayName: phoneNumber,
          email: email,
          photoURL: 'https://img.icons8.com/metro/52/000000/gender-neutral-user.png',
          phoneNumber: phoneNumber,
        },
        function(error) {
          if (error) {
            console.log(error);
          } else {
            // Data saved successfully!
          }
        },
      );

    // console.log(`displayName: ${displayName}`);
  } else {
    firebase
      .database()
      .ref(`users/${userId}`)
      .set(
        {
          userId: userId,
          displayName: displayName,
          email: email,
          photoURL: photoURL,
          phoneNumber: phoneNumber,
        },
        function(error) {
          if (error) {
            console.log(error);
          } else {
            // Data saved successfully!
          }
        },
      );
  }
}

export function writeLocationPrivateData(userId, position, name_address, place_id) {
  firebase
    .database()
    .ref(`location/${userId}/`)
    .set({
      location_id: userId,
      lat: position.lat,
      lng: position.lng,
      name_address: name_address,
      place_id: place_id,
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

export function writeLocationNearbyUsersData(
  userId,
  group_share_id,
  displayName,
  photoURL,
  email,
  position,
  name_address,
) {
  firebase
    .database()
    .ref(`location_near_by_users/${userId}/${group_share_id}`)
    .set({
      group_share_id: group_share_id,
      lat: position.lat(),
      lng: position.lng(),
      name_address: name_address,
      displayName: displayName,
      photoURL: photoURL,
      email: email,
    });
}

export function writeSearchLocationNearbyUsersData(
  userId,
  group_share_id,
  displayName,
  photoURL,
  email,
  position,
  name_address,
) {
  firebase
    .database()
    .ref(`search_location_near_by_users/${userId}/${group_share_id}`)
    .set({
      group_share_id: group_share_id,
      lat: position.lat(),
      lng: position.lng(),
      name_address: name_address,
      displayName: displayName,
      photoURL: photoURL,
      email: email,
    });
}

export function writeShareMyWayNearbyUsersData(
  userId,
  group_share_id,
  displayName,
  photoURL,
  email,
  start_position,
  end_position,
  start_address,
  end_address,
) {
  firebase
    .database()
    .ref(`share_my_way_near_by_users/${userId}/${group_share_id}`)
    .set({
      group_share_id: group_share_id,
      start_lat: start_position.lat(),
      start_lng: start_position.lng(),
      end_lat: end_position.lat(),
      end_lng: end_position.lng(),
      start_address: start_address,
      end_address: end_address,
      displayName: displayName,
      photoURL: photoURL,
      email: email,
    });
}

export function writeDestinationUsersData(userId, position, end_address) {
  firebase
    .database()
    .ref(`destination_users/${userId}/`)
    .set({
      location_id: userId,
      lat: position.lat(),
      lng: position.lng(),
      end_address: end_address,
    });
}

export function writeCreateGroupShareUserData(
  userId,
  start_lat,
  start_lng,
  end_lat,
  end_lng,
  start_address,
  end_address,
  start_time,
  end_time,
  user_num,
) {
  firebase
    .database()
    .ref(`group_share_user/${userId}`)
    .set({
      group_share_id: `${userId}`,
      user_num: user_num,
      start_time: start_time,
      end_time: end_time,
      post_time: `${new Date()}`,
      start_address: start_address,
      end_address: end_address,
      start_lat: start_lat,
      start_lng: start_lng,
      end_lat: end_lat,
      end_lng: end_lng,
    });
}

export function addUserToGroupShareData(userId, user) {
  firebase
    .database()
    .ref(`group_shareuserId/group_share`)
    .push(user);
}
