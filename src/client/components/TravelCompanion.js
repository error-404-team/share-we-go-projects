import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import FormHelperText from '@material-ui/core/FormHelperText';
import io from 'socket.io-client';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
    root: {
        // display: 'flex',
        marginTop: "25%"
    },
    formControl: {
        margin: theme.spacing(3),
    },
    group: {
        margin: theme.spacing(1, 0),
    },
}));

export default function RadioButtonsGroup() {
    const classes = useStyles();
    const [value, setValue] = React.useState('1');

    const socket = io('http://localhost:7000/');

    function handleChange(event) {
        setValue(event.target.value);
    }

    socket.emit('number_of_travel', value)

    return (
        <div className={classes.root}>
            <center>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Travel Companion</FormLabel>
                    <RadioGroup
                        
                        aria-label="gender"
                        name="gender1"
                        className={classes.group}
                        value={value}
                        onChange={handleChange}
                    >

                        <FormControlLabel value="1" control={<Radio color="primary" />} label="+1 คน"  />
                        <FormControlLabel value="2" control={<Radio color="primary" />} label="+2 คน" />
                        <FormControlLabel value="3" control={<Radio color="primary" />} label="+3 คน" />

                    </RadioGroup>

                   
                </FormControl>
            </center>
        </div>
    );
}