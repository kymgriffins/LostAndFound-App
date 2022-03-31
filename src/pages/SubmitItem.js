import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from 'react';
import axios from 'axios'

const theme = createTheme();
const itemType = {
  name:'',
  value:""
}

export default function SubmitItem() {
  const {user} = useContext(AuthContext)
  console.log(user)
  const [title,setTitle] = useState("");
  const [description,setDescription]= useState("");
  const [location,setLocation] = useState("");
  const [email,setEmail]= useState("");
  const [name,setName]= useState("");
  const postItem = async(e)=>{
    const postedItems = {
      title: title ,
      category: "ID",
      name: name,
      id_number: 1000000,
      description:description,
      location: location,
      item_type: "LOST",
      is_claimed: false,
      report: "",
      user: user.user_id
    }
    axios.post("http://127.0.0.1:8000/app/post-item/",postedItems)
  }
const handleSubmit= (e)=>{
  e.preventDefault()
  postItem()
}
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Submit Lost/Found Items
          </Typography>
          <Box component="form"  onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              value ={title}
              onChange={(e)=>setTitle(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              //autoComplete=""
              value ={description}
              onChange={(e)=>setDescription(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="location"
              label="Location"
              name="location"
              value ={location}
              onChange={(e)=>setLocation(e.target.value)}
              autoFocus
            />
            <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value ={email}
            onChange={(e)=>setEmail(e.target.value)}
            autoComplete="current-email"
            autoFocus
          />
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              type="name"
              id="name"
              value ={name}
              onChange={(e)=>setName(e.target.value)}
              autoComplete="current-name"
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}
