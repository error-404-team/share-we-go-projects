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
      <CardActions>
        <Typography gutterBottom variant="subtitle2" component="h2">
          เพศ
          </Typography>
        <Typography variant="subtitle2" color="textSecondary" component="p">
          -
          </Typography>
      </CardActions>

      <CardActions>
        <Typography gutterBottom variant="subtitle2" component="h2">
          อายุ
          </Typography>
        <Typography variant="subtitle2" color="textSecondary" component="p">
          -
          </Typography>

      </CardActions>
    </CardContent>

  );

}