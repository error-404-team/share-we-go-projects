import 'date-fns';
import React from 'react';
import io from 'socket.io-client';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
// import SnoozeIcon from "@material-ui/icons/Snooze";
// import AlarmIcon from "@material-ui/icons/AddAlarm";
// import { IconButton, InputAdornment } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from '@material-ui/pickers';
import lightBlue from "@material-ui/core/colors/lightBlue";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";


const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: lightBlue.A200,
      },
    },
    // MuiPickersCalendarHeader: {
    //   switchHeader: {
    //     backgroundColor: lightBlue.A200,
    //     color: "white",
    //   },
    // },
    MuiPickersDay: {
      day: {
        color: lightBlue.A700,
      },
      daySelected: {
        backgroundColor: lightBlue["400"],
      },
      dayDisabled: {
        color: lightBlue["100"],
      },
      current: {
        color: lightBlue["900"],
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: lightBlue["400"],
      },
    },
  },
  spacing: 2,
});

export default function CustomDateTimePicker() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const socket = io(`http://localhost:8080/`);

  function handleDateChange(date) {
    setSelectedDate(date);
    console.log(date);
    var d = new Date();

    const days = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
    const months = ["มกราคม", "กุมภาพันธ์", "มีนาคม ", "เมษายน", "พฤษภาคม ", "มิถุนายน ", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
    const timer = {
      start_time: `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`,
      end_time: `${days[date.getDay()]} ${date.getDate()} ${months[d.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    }

    socket.emit('boarding_time', timer)
  }

  return (
    <div style={{ marginTop: '50%' }}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <ThemeProvider theme={materialTheme}>
            <KeyboardDateTimePicker
              allowKeyboardControl={false}
              value={selectedDate}
              onChange={handleDateChange}
              // label="Keyboard with error handler"
              onError={console.log}
              minDate={new Date()}
              format="dd/MM/yyyy hh:mm a"
              ampm={false}

            />
          </ThemeProvider>
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
}