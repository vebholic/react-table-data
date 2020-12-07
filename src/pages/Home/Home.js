import React from "react";
import {Button, Container, Grid, Typography} from "@material-ui/core";
import axios from 'axios'
import {isEmail} from 'validator'

export default function Home(props) {
    const data = {
        name: '',
        email: '',
        address: {
            houseNo: '',
            streetNo: '',
            city: '',
            state: '',
            country: "",
        }
    }

    const [details, setDetails] = React.useState(data)

    const [success, setSuccess] = React.useState(false)

    const [error, setError] = React.useState(false)

    const [emailError, setEmailError] = React.useState(false)

    const handleAddress = e => {
        const newDetails = {...details}
        newDetails.address[e.target.name] = e.target.value
        setDetails(newDetails)
        setError(false)
        setEmailError(false)
        console.log(details)
    }

    const handleChange = (e) => {
        const newDetails = {...details}
        newDetails[e.target.name] = e.target.value
        setDetails(newDetails)
        setError(false)
        setEmailError(false)
        console.log(details)
    }

    const handleSubmit = async () => {
        if (details.name.length && details.email.length && details.address.city.length && details.address.houseNo.length) {
            if (isEmail(details.email)) {
                try {
                    const res = await axios.post(
                        "https://myappproject-1b405-default-rtdb.firebaseio.com/users.json",
                        details
                    );
                    console.log(res)
                    if (res.status === 200) {
                        setDetails(data)
                        setSuccess(true)
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                setEmailError(true)
            }
        } else {
            setError(true)
        }
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Container maxWidth="md">
                    <Grid container justify="center" spacing={4}>
                        {success ? (
                            <Grid item xs={12}>
                                <Typography>Your details has been saved</Typography>
                            </Grid>
                        ) : <div/>}
                        {error ? (
                            <Grid item xs={12}>
                                <Typography>Required fields are empty</Typography>
                            </Grid>
                        ) : <div/>}
                        {emailError ? (
                            <Grid item xs={12}>
                                <Typography>Email is not correct</Typography>
                            </Grid>
                        ) : <div/>}
                        <Grid item xs={12}>
                            <input
                                placeholder="Name *"
                                name={'name'}
                                value={details.name}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                placeholder="Email *"
                                name={'email'}
                                value={details.email}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                placeholder="House No *"
                                name={'houseNo'}
                                value={details.address.houseNo}
                                onChange={(e) => handleAddress(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                placeholder="Street No"
                                name={'streetNo'}
                                value={details.address.streetNo}
                                onChange={(e) => handleAddress(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                placeholder="City"
                                name={'city'}
                                value={details.address.city}
                                onChange={(e) => handleAddress(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                placeholder="State"
                                name={'state'}
                                value={details.address.state}
                                onChange={(e) => handleAddress(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                placeholder="Country"
                                name={'country'}
                                value={details.address.country}
                                onChange={(e) => handleAddress(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </Grid>
    );
}
