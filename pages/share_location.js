import React, { useState } from 'react';
import Router from 'next/router';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider, withStyles } from '@material-ui/styles';
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
import Link from 'next/link';


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
//         </div>
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
    return ['ปลายทาง', 'เวลา', 'ผู้ร่วมทาง'];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return (<PlaceAutocompleteAndDirections />);
        case 1:
            return (<CustomDateTimePicker />);
        case 2:
            return (<TravelCompanion />);
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
    const steps = getSteps();

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
                        <center style={{
                            marginTop: "25%"
                        }}>
                            <h1>สร้างการแชร์เส้นทาง</h1>
                            {/* <br/> */}
                            <h1>เสร็จสิ้น</h1>
                        </center>
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