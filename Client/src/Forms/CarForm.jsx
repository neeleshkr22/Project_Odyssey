import React, { useState } from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';

const CarForm = () => {
    const [carDetails, setCarDetails] = useState({
        make: '',
        model: '',
        year: '',
        licensePlate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarDetails({ ...carDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Car Details Submitted:', carDetails);
    };

    return (
        <Paper style={{ padding: 20 }}>
            <h2>Add Car Details</h2>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField label="Make" name="make" fullWidth onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Model" name="model" fullWidth onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Year" name="year" type="number" fullWidth onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="License Plate" name="licensePlate" fullWidth onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default CarForm;



