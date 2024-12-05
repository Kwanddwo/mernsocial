import { Alert, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material'
import { useState } from 'react';
import { Form, useActionData } from 'react-router-dom'

const SignUp = () => {
    const error = useActionData();

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleInputError = name => {
        if (!error) {return false}
        return error.toLowerCase().includes(name) ? true : false
    }

    const handleChange = name => e => {
        setState({...state, [name]: e.target.value})
    }

    const handleSubmit = () => {
        setState({
            name: '',
            email: '',
            password: '',
        });
    }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 10 }}>
        <Card>
            <CardContent>
                <Typography variant="h4" component="h1" textAlign="center" gutterBottom>Sign Up</Typography>
                <Form method='post' onSubmit={handleSubmit}>
                    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <TextField  margin="dense" variant="standard"
                            name="name" label="Name" error={handleInputError('name')}
                            required onChange={handleChange('name')} >
                        </TextField>
                        <TextField margin="dense" variant="standard" 
                            name="email" label="Email" error={handleInputError('email')}
                            required onChange={handleChange('email')}>
                        </TextField>
                        <TextField margin="dense" variant="standard" 
                            name="password" label="Password" error={handleInputError('password')}
                            type="password" required onChange={handleChange('password')}>
                        </TextField>
                        <Button variant='contained' type="submit" sx={{ marginTop: 2 }}>SUBMIT</Button>
                    </Container>
                </Form>
            </CardContent>
        </Card>
        {error ?
            <Alert sx={{ marginTop: 2 }} severity='error' >{error}</Alert>
            : ''
        }
    </Container>
  )
}

export default SignUp
