import { Container, IconButton, Avatar, Card, CardContent, ListItemButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import theme from "../theme";
import { useLoaderData, useNavigate } from "react-router";
import PropTypes from "prop-types";

const Users = () => {
    const { users } = useLoaderData();

    return (
        <Container sx={{ marginTop: 5 }}>
            <Card elevation={3}>
                <CardContent>
                    <Typography variant="h5" component="h1">
                        All Users
                    </Typography>
                </CardContent>
                <List>
                    {
                        users ? 
                            users.map((user, key) => <UserCard user={user} key={key} />)
                            : <Typography variant="h6" m={2}>No users</Typography>
                    }
                </List>
            </Card>
        </Container>
    )
}

const UserCard = ({ user }) => {
    const navigate = useNavigate();
    return (
        <ListItemButton onClick={() => {navigate(`/users/${user._id}`)}}>
            <ListItem
                    secondaryAction={
                        <IconButton edge="end" aria-label="lol">
                        <ArrowForwardIcon/>
                        </IconButton>
                    }
                    >
                    <ListItemAvatar>
                        <Avatar src={user.photoUrl || `https://robohash.org/${user.name}?set=set3`} />
                    </ListItemAvatar>
                    <ListItemText
                        sx={{ color: theme.palette.primary.main }}
                        primary={ user.name }
                        secondary={user.lastActive ? 'Secondary text' : null}
                    />
            </ListItem>
        </ListItemButton>
    )
}

UserCard.propTypes = {
    "user": PropTypes.shape({
    "_id": PropTypes.string,
    "name": PropTypes.string,
    "email": PropTypes.string,
    "created": PropTypes.instanceOf(Date),
    "photoUrl": PropTypes.string,
    "lastActive": PropTypes.instanceOf(Date)
  })
}

export default Users
