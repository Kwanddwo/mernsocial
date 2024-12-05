import {
  Avatar, 
  Box,
  Button,
  Card,
  CardContent, 
  CardMedia, 
  Container, 
  IconButton, 
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useLoaderData, useNavigate } from 'react-router';
import { useState } from 'react';
import DeleteUserDialog from './DeleteUserDialog';
import { Form } from 'react-router-dom';
      

const Profile = () => {
  const { profile, isCurrentUser, user } = useLoaderData();
  console.log(profile);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(profile.followers && profile.followers.some(u => u._id == user._id));

  const handleOpen = () => {setOpen(true)}

  const FollowingButton = () => {
    return (
      <Form action='follow' method={isFollowing ? 'DELETE' : 'POST'}>
        <Button
          type='submit'
          variant={isFollowing ? 'outlined' : 'contained'}
          onClick={() => {setIsFollowing(!isFollowing);}}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      </Form>
      
    )
  }

  return (
    <>
      <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
        <Card sx={{ p: 0.5 }} elevation={2}>
          <Box sx={{ display: "flex", alignItems: 'center' }}>
            <CardMedia >
              <Avatar 
                sx={{ minHeight: 120, minWidth: 120, m: 1 }}
                src={profile.photoUrl}
                alt={profile.name}
              />
            </CardMedia>
            <CardContent>
              <Typography variant='h5' component='h1'>{profile.name}</Typography>
              <Typography 
                variant='subtitle1' 
                component='p'
                color='text.secondary'
              >
                  {profile.email}
              </Typography>
            </CardContent>
            {
              isCurrentUser ?
                <CardContent sx={{ marginLeft: 'auto' }}>
                  <IconButton aria-label="edit" onClick={() => {navigate(`/users/${profile._id}/edit`)}}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={handleOpen} >
                    <DeleteIcon color="secondary" />
                  </IconButton>
                </CardContent>
                : <FollowingButton />
            }
          </Box>
          <CardContent sx={{ paddingBottom: 0 }}>
            <Typography variant='body1' sx={{ wordWrap: 'break-word' }}>{profile.about}</Typography>
            <Typography variant="body2" color="text.secondary">Joined: {new Date(profile.created).toDateString()}</Typography>
          </CardContent>
        </Card>
      </Container>
      <DeleteUserDialog profile={profile} open={open} setOpen={setOpen} />
    </>
  )
}

export default Profile
