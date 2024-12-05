import { Button, Container, Typography } from '@mui/material'
import { useNavigate, useRouteError } from 'react-router'

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <Typography variant="h3" component="h1">Oh no!</Typography>
            <Typography variant="h5" gutterBottom>An error has occured</Typography>
            <Typography variant="body1" sx={{ marginBottom: 5 }}>{error.statusText || error.name}: {error.message}</Typography>
            <Button variant="contained" onClick={() => {navigate(-1)}}>Go Back</Button>
        </Container>
    )
}

export default ErrorPage
