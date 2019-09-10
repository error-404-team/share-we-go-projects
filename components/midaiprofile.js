import React , {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import firebase from "../lib/firebase";


const useStyles = makeStyles({
  bigAvatar: {
    margin: 50,
    width: 200,
    height: 200
  },
});

export default function ImageAvatars() {
  const classes = useStyles();
const [photoURL, setPhotoURL] = useState('https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiTltSo4MDkAhURUI8KHffBDJUQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.onlinewebfonts.com%2Ficon%2F227642&psig=AOvVaw0nPTqj6ZudRIcCKQWYbHEk&ust=1568015831780316');

  firebase.auth().onAuthStateChanged((user) => {

    if (user) {
      console.log(user);
      firebase.database().ref('users/' + user.uid + '/photoURL').on('value', function (params) {
        setPhotoURL(params.val())
        console.log(params.val());

      })
    }
  })
  return (
  <Box>
    <Grid container justify="center" alignItems="center">
      <Avatar src={photoURL} className={classes.bigAvatar} />
    </Grid>
  </Box>
  );
}
