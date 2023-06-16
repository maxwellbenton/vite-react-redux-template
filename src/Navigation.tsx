import React, { useState, useRef } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import {
  Link
} from "react-router-dom";
import GrassOutlinedIcon from '@mui/icons-material/GrassOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';


function Navigation() {
  return (
    <Container
      disableGutters
      style={{
        background: '#ddd',
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{
          height: '100%'
        }}
      >
        <HomeButton />
        <UnlockButton />
        <BackButton />
      </Grid>
    </Container>
  );
}

// HELPER COMPONENTS

function HomeButton() {
  return (
    <Button>
      <Link to="/">
        <GrassOutlinedIcon fontSize='large' />
      </Link>
    </Button>
  )
}

function UnlockButton() {
  const [clicked, setClicked] = useState(false)
  const handleClick = () => setClicked(!clicked)
  return clicked
    ? <Button onClick={handleClick}><Link to="/plant"><LockOpenOutlinedIcon fontSize='large' /></Link></Button>
    : <Button onClick={handleClick}><Link to="/edit"><LockOutlinedIcon fontSize='large' /></Link></Button>
}

function BackButton() {
  return <Button><Link to="/list"><UndoOutlinedIcon fontSize='large' /></Link></Button>
}

export default Navigation;