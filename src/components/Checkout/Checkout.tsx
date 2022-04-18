import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { selectors } from '../../features/userChoices'
import { useSelector } from 'react-redux';
import {
    Paper,
    Box,
    Grid,
} from '@mui/material';
import { useState } from 'react';
import OrderSummary from '../OrderSummary';
import { SupmittionData } from '../../features/types';
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('name is required')
        .min(2, 'name must be at least 2 characters'),
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    phone: Yup.string()
        .required('phone is required')
        .min(11, 'phone must equal 11 number')
        .max(11, 'phone must equal 11 number'),
});
export default function Checkout() {
    const {
        control,
        handleSubmit,
        formState
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange",
    });
    const { errors, isValid } = formState;
    const [submittedData, setSubmittedData] = useState<SupmittionData>(null)
    const totalPrice = useSelector(selectors.getTotalPrice)
    const numOfSongs = useSelector(selectors.getNumOfSongs)

    const submitHandler = (data: SupmittionData) => {
        setSubmittedData(data)
    }


    return <>{submittedData ? <OrderSummary name={submittedData?.name} email={submittedData?.email} phone={submittedData?.phone} total={totalPrice} songsCount={numOfSongs} /> : <form> <Paper>
        <Box px={3} py={2}>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth error={errors.name ? true : false} variant="standard">
                                <InputLabel htmlFor="name">Name</InputLabel>
                                <Input
                                    id="name"
                                    {...field}
                                    aria-describedby="name-error-text"
                                    disableUnderline={true}
                                />
                                <FormHelperText id="name-error-text">{errors.name?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth error={errors.email ? true : false} variant="standard">
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input
                                    id="email"
                                    {...field}
                                    disableUnderline={true}
                                    aria-describedby="email-error-text"
                                />
                                <FormHelperText id="email-error-text">{errors.email?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth error={errors.phone ? true : false} variant="standard">
                                <InputLabel htmlFor="phone">Phone</InputLabel>
                                <Input
                                    id="phone"
                                    disableUnderline={true}
                                    {...field}
                                    aria-describedby="phone-error-text"
                                />
                                <FormHelperText id="phone-error-text">{errors.phone?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                    <Button
                        variant="contained"
                        type='submit'
                        onClick={handleSubmit(submitHandler)}
                        sx={{ mt: 3, ml: 1 }}
                        disabled={!isValid}
                    >
                        Place order
                    </Button>
                </Grid>
            </Grid>
        </Box>
    </Paper>
    </form>
    }
    </>
}