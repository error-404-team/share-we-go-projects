import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import io from 'socket.io-client';

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
    const [value, setValue] = React.useState('MaleAndFemale');

    const socket = io(`http://localhost:8080/`);

    function handleChange(event) {
        setValue(event.target.value);
    }
    
    socket.emit('gender', value)

    return (
        <div className={classes.root}>
            <center>
                <FormControl component="fieldset" className={classes.formControl}>
                    
                    <FormLabel component="legend">Select gender</FormLabel>
                    <RadioGroup
                        aria-label="gender"
                        name="gender1"
                        className={classes.group}
                        value={value}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="Male" control={<Radio color="primary" />} label="ชาย" />
                        <FormControlLabel value="Female" control={<Radio color="primary" />} label="หญิง " />
                        <FormControlLabel value="MaleAndFemale" control={<Radio color="primary" />} label="ทุกเพศ "  />

                    </RadioGroup>
                </FormControl>
            </center>
        </div>
    );
}