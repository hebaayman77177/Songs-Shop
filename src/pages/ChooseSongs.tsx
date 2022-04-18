import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes, selectors } from '../features/navigator'
import { selectors as useChoicesSelectors } from '../features/userChoices'
import ChooseSingers from '../components/ChooseSingers/ChooseSingers';
import ChooseAlbums from '../components/ChooseAlbums/ChooseAlbums';
import ChooseAlbumSongs from '../components/ChooseAlbumSongs/ChooseAlbumSongs';
import Checkout from '../components/Checkout/Checkout';
import Grid from '@mui/material/Grid';

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <ChooseSingers />;
        case 1:
            return <ChooseAlbums />;
        case 2:
            return <ChooseAlbumSongs />;
        case 3:
            return <Checkout />;
        default:
            throw new Error('Unknown step');
    }
}

const theme = createTheme();

export default function ChooseSongs() {

    const tabs = useSelector(selectors.getTabs)
    const currentTapIndex = useSelector(selectors.getCurrentTapIndex)
    const totalPrice = useSelector(useChoicesSelectors.getTotalPrice)
    const numOfSongs = useSelector(useChoicesSelectors.getNumOfSongs)

    const dispatch = useDispatch()
    const handleNext = () => {
        dispatch({ type: actionTypes.NAV_NEXT })
    };
    const handleBack = () => {
        dispatch({ type: actionTypes.NAV_BACK })
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* <Container component="main" maxWidth="sm" sx={{ mb: 4 }}> */}
            <Grid container >
                <Grid item xs={8}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            Choose your Wonderfol songs :)
                        </Typography>
                        <Stepper activeStep={currentTapIndex} sx={{ pt: 3, pb: 5 }}>
                            {tabs.map((tab) => (
                                <Step key={tab.text}>
                                    <StepLabel>{tab.text}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <React.Fragment>
                            <React.Fragment>
                                {getStepContent(currentTapIndex)}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {currentTapIndex !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            Back
                                        </Button>
                                    )}
                                    {currentTapIndex < tabs.length - 1 && <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        {currentTapIndex === tabs.length - 1 ? 'Place order' : 'Next'}
                                    </Button>}
                                </Box>
                            </React.Fragment>
                        </React.Fragment>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Box sx={{ width: "150px", border: "1px solid rgba(0, 0, 0, 0.12)", padding: "11px", margin: "3px" }}>
                                    <Typography>
                                        Num of songs :D <br />
                                        {numOfSongs}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ width: "150px", border: "1px solid rgba(0, 0, 0, 0.12)", padding: "11px", margin: "3px" }}>
                                    <Typography>
                                        Total :( <br />
                                        {totalPrice}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            {/* </Container> */}
        </ThemeProvider>
    );
}