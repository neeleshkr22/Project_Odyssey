import React, { useState } from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';

const DriverForm = () => {
    const [driverDetails, setDriverDetails] = useState({
        name: '',
        contact: '',
        licenseNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDriverDetails({ ...driverDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Driver Details Submitted:', driverDetails);
    };

    return (
        <Paper style={{ padding: 20 }}>
            <h2>Add Driver Details</h2>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField label="Name" name="name" fullWidth onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Contact Number" name="contact" fullWidth onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="License Number" name="licenseNumber" fullWidth onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default DriverForm;
