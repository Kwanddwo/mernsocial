import { styled, Typography } from "@mui/material"

import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import unicornImage from "../assets/images/unicornImage.jpg"

import { grey } from "@mui/material/colors"
import theme from "../theme"
import authHelper from "../auth/auth-helper"

const StyledCard = styled(Card)({
  maxWidth: 600,
  margin: 'auto',
  marginTop: 6
});

const Home = () => {
  console.log(authHelper.isAuthenticated())
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" component="h1">
          Home Page
        </Typography>
      </CardContent>
      <CardMedia
        image={unicornImage}
        alt="Unicorn"
        sx={{minHeight: 400}}
       />
      <CardContent sx={{backgroundColor: grey['A400']}}>
        <Typography variant="body2" component="p">
          Photo by UNKNOWN on Unsplash
        </Typography>
      </CardContent>
      <CardContent>
        <Typography sx={{ p: [3, 2.5, 2], color: theme.palette.openTitle }}>
          Welcome to the home page.
        </Typography>
      </CardContent>
    </StyledCard>
  )
}

export default Home
