import React, { useState, useRef } from 'react'
import {
  Link,
  Outlet
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { updatePlant } from './appSlice'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import DehazeOutlinedIcon from '@mui/icons-material/DehazeOutlined';
import GrassOutlinedIcon from '@mui/icons-material/GrassOutlined';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function SplashPage() {
  return (
    <div
      style={{
      display: 'flex',
      height: '100%',
      flexFlow: 'column nowrap',
      justifyContent: 'space-around'
      }}
    >
      <Title />
      <NextPriorityInterface />
      <AddPlantInterface />
    </div >
  );
}

function Title() {
  return (
    <Typography
      sx={{ fontFamily: "'Source Sans Pro', sans-serif", padding: '0', marginTop: '1em' }}
      variant="h3"
      color="text.secondary"
    >
      Groundskeeper
    </Typography>
  )
}

function NextPriorityInterface() {
  const plants = useSelector((state: any) => state.plants); // Replace with your selector
  const dispatch = useDispatch();

  const handleUpdatePlant = (parameters: any) => {
    dispatch(updatePlant(parameters));
  }

  return (
    <Container
      disableGutters
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <Button
        style={{
          height: '100%'
        }}
      >
        <ArrowBackIosNewIcon style={{ fontSize: '48' }} />
      </Button>
      <Paper
        elevation={10}
        style={{
          minWidth: '240px',
          width: '60%',
          maxWidth: '300px',
          display: 'flex',
          flexFlow: 'column nowrap'
        }}
      >
        <Typography variant='h5'>Water Plant</Typography>
        <img src="src/assets/plant.png" alt="plant fill image" style={{ width: '100%' }} />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems='center'
          alignContent='center'
        >
          <SkipButton />
          <DoneButton />
        </Grid>
      </Paper>
      <Button
        style={{
          height: '100%',
        }}
      >
        <ArrowForwardIosIcon
          style={{ fontSize: '48' }}
        />
      </Button>
    </Container>
  );
}

function SkipButton() {
  return (
    <Button
      variant="contained"
      color="secondary"
      style={{
        width: '30%',
        margin: '0.2em',
        background: '#88E830'
      }}
    >
      <SkipNextOutlinedIcon fontSize='large' />
    </Button>
  );
}

function DoneButton() {
  return (
    <Button
      variant="contained"
      color="success"
      style={{
        width: '65%',
        margin: '0.2em'
      }}
    >
      <CheckOutlinedIcon fontSize='large' />
    </Button>
  )
}

function AddPlantInterface() {
  return (
    <Container
      disableGutters
    >
      <Typography
        sx={{ fontFamily: "'Source Sans Pro', sans-serif" }}
        variant="h5"
        color="text.secondary"
        gutterBottom
      >Add Plant</Typography>
      <Grid
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{
          height: '100%'
        }}
      >
        <PhotoFromFileButton />
      </Grid>
    </Container>
  );
}

function CameraModeButton() {
  return (
    <Button
      size="large"
      variant="contained"
      color="success"
      style={{
        height: '100%',
        width: '40%',
        margin: '0.2em'
      }}
    >
      <AddAPhotoOutlinedIcon fontSize='large'>
        <input type="file" accept="image/*" />
      </AddAPhotoOutlinedIcon>
    </Button>
  );
}

function PhotoFromFileButton() {
  const inputRef: any = useRef(null);
  function handleClick() {
    inputRef.current.click();
  }
  return (
    <div>
      <Button
        size="large"
        variant="contained"
        color="success"
        style={{
          height: '100%',
          width: '40%',
          margin: '0.2em'
        }}
        onClick={handleClick}
      >
        <AddAPhotoOutlinedIcon fontSize='large' />
      </Button>
      <input
        id='add-photo-alt'
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{
          display: 'none'
        }}
      />
    </div>
  );
}

export default SplashPage;
