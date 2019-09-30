import React, { useState } from 'react';
import Router from 'next/router';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
// import { ThemeProvider, withStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
// import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import { createMuiTheme } from '@material-ui/core/styles';
import ShareLocationBar from '../components/ShareLocationBar';
import PlaceAutocompleteAndDirections from '../components/PlaceAutocompleteAndDirections';
import CustomDateTimePicker from '../components/CustomDateTimePicker';
import TravelCompanion from '../components/TravelCompanion';
// import geno from '../image/geno.svg'
import Selectgender from '../components/Selectgender';
import Link from 'next/link';
import CommuteIcon from '@material-ui/icons/Commute';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RecentActorsIcon from '@material-ui/icons/RecentActors';

import firebase from '../lib/firebase';
import {
    writeCreateGroupShareUserDataHost,
    writeCreateGroupShareUserDataDateTime,
    writeCreateGroupShareUserDataNumberOfTravel,
    writeCreateGroupShareUserDataGender,
    writeCreateGroupShareUserDataHeader,
    writeCreateGroupShareUserDataKeys,
    shareLocation
} from '../firebase-database/write-data'

require('es6-promise').polyfill();
require('isomorphic-fetch');



// const share_location_theme = createMuiTheme({
//     palette: {
//         primary: {
//             main: 'rgba(255, 255, 255, 0)',
//         }
//     },
// });

// function QontoStepIcon(props) {
//     const classes = useQontoStepIconStyles();
//     const { active, completed } = props;

//     return (
//         <div
//             className={clsx(classes.root, {
//                 [classes.active]: active,
//             })}
//         >
//             {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
//         </div>PlaceAutocompleteAndDirections
//     )
// }

// const useQontoStepIconStyles = makeStyles({
//     root: {
//         color: '#eaeaf0',
//         display: 'flex',
//         height: 22,
//         alignItems: 'center'
//     },
//     active: {
//         color: '#784af4'
//     },
//     circle: {
//         width: 8,
//         height: 8,
//         borderRadius: '50%',
//         backgroundColor: 'currentColor'
//     },
//     completed: {
//         color: '#784af4',
//         zIndex: 1,
//         fontSize: 18
//     }
// })


function getSteps() {
    return ['เส้นทาง', 'วันเวลา', 'จำนวน', 'เพศ'];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            // หน้าสร้างเเชร์ Form 1 ต้นทาง-ปลายทาง 
            return (<PlaceAutocompleteAndDirections />);

        case 1:
            // หน้าสร้างเชร์ ตั้งค่าเวลา Form 2
            return (<CustomDateTimePicker />);
        case 2:
            // หน้าสร้างเชร์ จำนวนเพื่อนร่วมทาง (ขาดเพศ) 
            return (<TravelCompanion />);

        case 3:
            //หน้าเเชร์เลือกเพศ
            return (<Selectgender />);

        default:
            return 'Uknown stepIndex';
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '-webkit-fill-available',
        // padding: '30px 0px 10px 0px'
    },
    button: {
        marginRight: theme.spacing(1),
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        // marginTop: theme.spacing(1),
        // marginBottom: theme.spacing(1),
    },
}));



function ShareLocation(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState(new Set());
    const [skipped, setSkipped] = useState(new Set());
    const [routes, setRoutes] = useState(new Set());
    const [boardingTime, setBoardingTime] = useState(new Set());
    const [numberOfTravel, setNumberOfTravel] = useState("");
    const [gender, setGender] = useState("");
    const [shareGroupData, setShareGroupData] = useState(new Set());
    const steps = getSteps();



    function routerTravels(data) {
        // console.log(data);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                writeCreateGroupShareUserDataHost(user.uid, data)
            }
        })
        // return data
    };


    function boardingTimes(data) {
        // console.log(data);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                writeCreateGroupShareUserDataDateTime(user.uid, data)
            }
        })
        // return data
    };
    function numberOfTravels(data) {
        // console.log(data);
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user);

            if (user) {
                writeCreateGroupShareUserDataNumberOfTravel(user.uid, data)
            }
        })
        // return data
    };
    function genders(data) {
        // console.log(data);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                writeCreateGroupShareUserDataGender(user.uid, data)

                firebase.database().ref(`/group_share_user/${user.uid}`).once('value').then(function (snapshot) {
                    let users = (snapshot.val());
                    console.log(users);
                    setShareGroupData(users);
                    setRoutes(users.host.routes[0].legs[0]);
                    setBoardingTime(users.date_time);
                    setNumberOfTravel(users.number_of_travel);
                    setGender(users.gender);
                });
                firebase.database().ref(`/users/${user.uid}`).once('value').then(function (snapshot) {
                    let users = (snapshot.val());
                    writeCreateGroupShareUserDataHeader(user.uid, users);
                    shareLocation(user.uid, true)
                    writeCreateGroupShareUserDataKeys(user.uid)
                });
            }
        })
        // return data
    };

    // console.log(Router);

    function totalSteps() {
        return getSteps().length;
    }

    function isStepOptional(step) {
        return step === 1;
    }

    function handleSkip() {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(prevSkipped => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    }

    function skippedSteps() {
        return skipped.size;
    }

    function completedSteps() {
        return completed.size;
    }

    function allStepsCompleted() {
        return completedSteps() === totalSteps() - skippedSteps();
    }

    function isLastStep() {
        return activeStep === totalSteps() - 1;
    }

    function handleNext() {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed
                // find the first step that has been completed
                steps.findIndex((step, i) => !completed.has(i))
                : activeStep + 1;

        setActiveStep(newActiveStep);
    }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    const handleStep = step => () => {
        setActiveStep(step);
    };

    function handleComplete() {
        const newCompleted = new Set(completed);
        newCompleted.add(activeStep);
        setCompleted(newCompleted);
        console.log(activeStep);

        if (activeStep === 0) {
            fetch(`http://localhost:8080/origin_destination_route`).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function (data) {
                routerTravels(data)
                console.log(data);

            })
        }

        if (activeStep === 1) {
            fetch(`http://localhost:8080/boarding_time`).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function (data) {
                boardingTimes(data)
                // console.log(data);

            })
        }

        if (activeStep === 2) {
            fetch(`http://localhost:8080/number_of_travel`).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function (data) {
                numberOfTravels(data)
                // console.log(data);

            })
        }

        if (activeStep === 3) {
            fetch(`http://localhost:8080/gender`).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function (data) {
                genders(data)

                // console.log(data);

            })
        }


        /**
         * Sigh... it would be much nicer to replace the following if conditional with
         * `if (!this.allStepsComplete())` however state is not set when we do this,
         * thus we have to resort to not being very DRY.
         */
        if (completed.size !== totalSteps() - skippedSteps()) {
            handleNext();
        }
    }

    function handleReset() {
        setActiveStep(0);
        setCompleted(new Set());
        setSkipped(new Set());
    }

    function isStepSkipped(step) {
        return skipped.has(step);
    }

    function isStepComplete(step) {
        return completed.has(step);
    }

    function handleGoBackPage() {
        Router.back()
    }

    function goBack() {
        if (activeStep === 0) {
            handleGoBackPage();
        } else {
            handleBack();
        }
    }



    return (
        <div className={classes.root}>
            <ShareLocationBar>
                <Button onClick={goBack}>
                    <IconButton aria-label="Back" >
                        <ArrowBackIosIcon />
                    </IconButton>
                </Button>
                <Stepper alternativeLabel nonLinear activeStep={activeStep} style={{
                    width: '-webkit-fill-available',
                    padding: '30px 0px 10px 0px'
                }}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const buttonProps = {};
                        if (isStepOptional(index)) {
                            buttonProps.optional = <Typography variant="caption"></Typography>;
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (

                            <Step key={label} {...stepProps} >
                                <StepButton
                                    onClick={handleStep(index)}
                                    completed={isStepComplete(index)}
                                    {...buttonProps}
                                >
                                    {label}
                                </StepButton>

                                {/* <StepLabel StepIconComponent={QontoStepIcon} >{label}</StepLabel> */}

                            </Step>
                        );
                    })}
                </Stepper>
            </ShareLocationBar>
            <div>
                {allStepsCompleted() ? (
                    <div>
                        <center>
                            <div bgcolor="99FF99" shadow="5">
                                <h2>แชร์เส้นทางเสร็จสิ้น <CheckCircleIcon></CheckCircleIcon></h2>
                                <hr />
                            </div>
                        </center>
                        <br/>
                        <div bgcolor="#DCDCDC">
                            <center>
                                <hr border="5" shadow="5"/>

                                <div>
                                    <div>
                                        <h2><CommuteIcon align></CommuteIcon> ต้นทาง - ปลายทาง</h2>
                                    </div>
                                    <b>ต้นทาง:</b> {routes.start_address}
                                    <br/>
                                    <b>ปลายทาง:</b> {routes.end_address}
                                    <br/>
                                    <h2><RecentActorsIcon></RecentActorsIcon> ข้อมูลการแชร์</h2>
                                    <b>เริ่มการแชร์:</b> {boardingTime.start_time}
                                    <br/>
                                    <b>ปิดการแชร์:</b> {boardingTime.end_time}
                                    <br/>
                                    <b>ต้องการผู้ร่วมเดินทางเพิ่ม:</b> {numberOfTravel} คน
                                    <b>ต้องการร่วมเดินทางกับเพศ: {gender}</b>
                                    <hr border="5" shadow="5"/>
                                </div>
                            </center>
                        </div>

                        <div style={{
                            position: "fixed",
                            bottom: '25px',
                            width: '-webkit-fill-available'
                        }}>
                            <center >
                                <Link href="/share_group">
                                    <Button variant="contained" color="primary" onClick={handleReset}>ปิด</Button>
                                </Link>
                            </center>
                        </div>
                    </div>
                ) : (
                        <div>

                            {/* <ThemeProvider theme={share_location_theme}> */}
                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                            <div style={{
                                position: 'fixed',
                                bottom: '25px',
                                width: '-webkit-fill-available'
                            }}>
                                <center>
                                    {/* <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>Back</Button> */}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >Next</Button>
                                    {isStepOptional(activeStep) && !completed.has(activeStep) && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSkip}
                                            className={classes.button}
                                        >Skip</Button>
                                    )}

                                    {activeStep !== steps.length &&
                                        (completed.has(activeStep) ? (
                                            <Typography variant="caption" className={classes.completed}>Step {activeStep + 1} already completed</Typography>
                                        ) : (
                                                <Button variant="contained" color="primary" onClick={handleComplete}>
                                                    {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                                                </Button>
                                            ))}
                                </center>
                            </div>
                            {/* </ThemeProvider> */}
                        </div>
                    )}
            </div>
        </div>
    )
}

// QontoStepIcon.propTypes = {
//     active: PropTypes.bool,
//     completed: PropTypes.bool
// };

export default ShareLocation;