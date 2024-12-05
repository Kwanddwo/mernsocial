import { Alert, Avatar, Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material'
import { useState } from 'react';
import { Navigate, useActionData, useLoaderData, useNavigate } from 'react-router-dom'
import UploadIcon from '@mui/icons-material/Upload';
import authHelper from '../auth/auth-helper';

// TODO: password change shouldn't be on this page

const EditUser = () => {
    // const submit = useSubmit()
    const navigate = useNavigate();
    const error = useActionData();
    const { profile, isCurrentUser } = useLoaderData();

    const [state, setState] = useState({...profile, password: '', photo: undefined});

    const handleInputError = name => {
        if (!error) {return false}
        return error.toLowerCase().includes(name) ? true : false
    }

    const handleChange = name => e => {
        setState({...state, [name]: e.target.value})
    }

    // TODO: Create error messages for this
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (!/image\/.*/.test(file.type)) {return;}
        if (file.size > 16*1024*1024) {return;}
        setState({...state, photo: e.target.files[0]})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const userData = new FormData();
        console.log(state);
        for (const [key, value] of Object.entries(state)) {
            if ((!value) || state[key] === profile[key]) {
                continue;
            }
            userData.append(key, value);
        }
        console.log('userData')
        console.log(userData)
        // submit(userData, {method: 'post', encType: "multipart/form-data"});
        fetch(`http://localhost:3000/api/users/${profile._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + authHelper.isAuthenticated().token
            }
        })
            .then(res => {
            console.log(res);
            })
            .catch(err => {
            console.log(err);
            });
        navigate(`/users/${profile._id}`);
    }

    if (!isCurrentUser) {
        return (<Navigate to={`/users/${profile._id}`} />)
    }

  return (
    <form method='post' encType='multipart/form-data' onSubmit={onSubmit}>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 10 }}>
            <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CardContent sx={{ m: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Avatar
                        alt={profile.name}
                        src={state.photo ? URL.createObjectURL(state.photo) : profile.photoUrl}
                        sx={{ width: 200, height: 200, mb: 2 }}
                    />
                    <Button
                        component='label'
                        variant='contained'
                        endIcon={<UploadIcon />} 
                        sx={{ mb: 1 }}
                    >
                        <input
                            name='photo'
                            accept="image/*" 
                            type='file'
                            onChange={handlePhotoChange}
                            style={{display: 'none'}}
                        />
                        Upload Photo
                    </Button>
                    <Typography variant="body2">{state.photo ? state.photo.name : 'No image selected'}</Typography>
                </CardContent>

                <CardContent sx={{minWidth: 500}}>
                    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <TextField
                            fullWidth
                            margin="dense"
                            variant="filled"
                            defaultValue={profile.name}
                            name="name"
                            label="Name"
                            error={handleInputError('name')}
                            onChange={handleChange('name')}
                        />
                        <TextField
                            fullWidth
                            margin="dense" 
                            variant="filled"
                            defaultValue={profile.email}
                            name="email" 
                            label="Email" 
                            error={handleInputError('email')}
                            onChange={handleChange('email')} 
                        />
                        <TextField
                            fullWidth
                            placeholder='Unchanged'
                            margin="dense" 
                            variant="filled" 
                            name="password"
                            type="password" 
                            label="Password" 
                            error={handleInputError('password')}
                            onChange={handleChange('password')} 
                        />
                        <TextField
                            fullWidth
                            multiline
                            rows="2"
                            margin="dense"
                            variant="filled"
                            defaultValue={profile.about}
                            name="about"
                            label="About"
                            error={handleInputError('about')}
                            onChange={handleChange('about')}
                        />
                        <Box sx={{ display: 'flex', marginTop: 1 }}>
                            <Button variant='contained' type="submit" sx={{ margin: 1 }}>UPDATE</Button>
                            <Button variant='outlined' color="secondary" type="submit" sx={{ margin: 1 }} onClick={() => {navigate(-1)}}>CANCEL</Button>
                        </Box>
                    </Container>
                </CardContent>
            </Card>

            {error ?
                <Alert sx={{ marginTop: 2 }} severity='error'>{error}</Alert>
                : ''
            }
        </Container>
    </form>
  )
}

export default EditUser

