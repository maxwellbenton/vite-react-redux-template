import React, { useState } from 'react'
import {
  Link
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
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import './App.css'

function SplashPage() {
  return (
    <Stack
      direction='column'
      style={{
        height: `${window.innerHeight}px`,
        justifyContent: 'space-between'
      }}
    >
      <Stack
        direction='column'
        spacing={10}
        style={{
          height: '100%',
          marginTop: '2em'
        }}
      >
        <Title />
        <NextPriorityInterface />
        <AddPlantInterface />
        {/* <GoToListButton /> */}
      </Stack>
      <Navigation />
    </Stack >
  );
}

function Title() {
  return (
    <Typography
      sx={{ fontFamily: "'Source Sans Pro', sans-serif" }}
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
        height: '51.5%'
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
          height: '100%',
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
        height: '85%',
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
        width: '60%',
        height: '100%',
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
      style={{
        height: '10%'
      }}
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
        <CameraModeButton />
        <PhotoFromFileButton />
      </Grid>
    </Container>
  );
}

// function GoToListButton() {
//   return (
//     <Container
//       disableGutters
//       style={{
//         background: '#ccc',
//         width: '100%',
//         height: '8%',
//         padding: '0.5em 0.5em'
//       }}
//     >
//       <Link to="/list">
//         <Button
//           variant="contained"
//           color="secondary"
//           style={{
//             width: '100%',
//             height: '100%'
//           }}
//         >
//           <DehazeOutlinedIcon />
//         </Button>
//       </Link>
//     </Container>
//   );
// }

function Navigation() {
  return (
    <Container
      disableGutters
      style={{
        background: '#ddd',
        height: '6%'
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
      <AddAPhotoOutlinedIcon fontSize='large' />
    </Button>
  );
}



function PhotoFromFileButton() {
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
      <AddPhotoAlternateOutlinedIcon fontSize='large' />
    </Button>
  );
}



// export default SplashPage;

function App() {
  // const count = useSelector((state: any) => state.app.value)
  // const dispatch = useDispatch()

  return (
    <div className="App">
      <SplashPage />
    </div>
  )
}

export default App
