import React, { useState } from "react";
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import firebase from "../lib/firebase";


export default function Personalform() {

  const [displayName, setDisplayName] = useState('-');

  firebase.auth().onAuthStateChanged((user) => {

    if (user) {
      console.log(user);
      firebase.database().ref('users/' + user.uid + '/displayName').on('value', function (params) {
        setDisplayName(params.val())
        console.log(params.val());
    
    if (user) {
      console.log(user);
      firebase.database().ref('users/' + user.uid + '/email').on('value', function (mail) {
        setDisplayName(mail.val())
        console.log(mail.val());

    if (user) {
       console.log(user);
      firebase.database().ref('users/' + user.uid + '/phoneNumber').on('value', function (phoneNum) {
        setDisplayName(phoneNum.val())
        console.log(phoneNum.val());

  if (user) {
       console.log(user);
      firebase.database().ref('users/' + user.uid + '/sex').on('value', function (sexy) {
        setDisplayName(sexy.val())
        console.log(sexy.val());

  if (user) {
       console.log(user);
      firebase.database().ref('users/' + user.uid + '/age').on('value', function (age) {
        setDisplayName(age.val())
        console.log(age.val());
     })
    }
  })
   

  return (

    <CardContent>
      <Typography gutterBottom variant="subtitle2" component="h2">
        ชื่อ
          </Typography>
      <Typography variant="h5" color="textSecondary" component="p">
        {displayName}
      </Typography>
      
      <Typography gutterBottom variant="subtitle2" component="h2">
        E-mail
          </Typography>
      <Typography variant="h5" color="textSecondary" component="p">
        {email}
      </Typography>

     <Typography gutterBottom variant="subtitle2" component="h2">
        เบอร์โทรศัพท์
          </Typography>
      <Typography variant="h5" color="textSecondary" component="p">
        {phoneNumber}
      </Typography>

      <CardActions>
        <Typography gutterBottom variant="subtitle2" component="h2">
          เพศ
          </Typography>
        <Typography variant="subtitle2" color="textSecondary" component="p">
          {sex}
          </Typography>
      </CardActions>

      <CardActions>
        <Typography gutterBottom variant="subtitle2" component="h2">
          อายุ
          </Typography>
        <Typography variant="subtitle2" color="textSecondary" component="p">
          {age}
          </Typography>
      </CardActions>


    </CardContent>

  );
  }