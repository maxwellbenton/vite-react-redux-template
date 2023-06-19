import React, { useState, useRef, useEffect, MouseEventHandler } from 'react'
import {
  Link,
  Outlet
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { updatePlant, clearSelectedPlant, updateEvents, updateEventsLastCreatedAt } from './appSlice'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { v4 as uuid } from 'uuid';
import { APP_NAME, APP_VERSION, MILLISECONDS_IN_A_DAY } from './constants'
import { AppData, Plant } from './types'
import Box from '@mui/material/Box';

function SplashPage() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(clearSelectedPlant())
  //   console.log('Splash Page')
  // }, [])

  return (
    <div
      style={{
        display: 'flex',
        height: '94%',
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
      {APP_NAME}
    </Typography>
  )
}

function NextPriorityInterface() {
  const dispatch = useDispatch();
  const [currentEventId, setCurrentEventId] = useState<string>('')
  const appData = useSelector((state: any) => state.app);
  const {
    plants,
    events: existingEvents,
    eventsLastCreatedAt
  }: AppData = appData

  const today = new Date()

  useEffect(() => {
    if (!eventsLastCreatedAt || eventsLastCreatedAt < today.getTime() - MILLISECONDS_IN_A_DAY) {
      console.log('No events created in the last 24 hours, updating events')
      const newEvents = appData.plants
        .map((plant: any) => {
          const thisPlantsEvents: any = []
          switch (plant.wateringFrequency) {
            case 25:
              if (plant.lastWatered < today.getTime() - MILLISECONDS_IN_A_DAY * 14) {
                thisPlantsEvents.push({
                  id: uuid(),
                  plantId: plant.id,
                  type: 'water',
                  createdAt: today.getTime(),
                  severity: 'medium'
                })
              }
              break;
            case 50:
              if (plant.lastWatered < today.getTime() - MILLISECONDS_IN_A_DAY * 7) {
                thisPlantsEvents.push({
                  id: uuid(),
                  plantId: plant.id,
                  type: 'water',
                  createdAt: today.getTime(),
                  severity: 'medium'
                })
              }
              break;
            case 75:
              if (plant.lastWatered < today.getTime() - MILLISECONDS_IN_A_DAY * 2) {
                thisPlantsEvents.push({
                  id: uuid(),
                  plantId: plant.id,
                  type: 'water',
                  createdAt: today.getTime(),
                  severity: 'low'
                })
              }
              break;
            case 100:
              if (plant.lastWatered < today.getTime() - MILLISECONDS_IN_A_DAY) {
                thisPlantsEvents.push({
                  id: uuid(),
                  plantId: plant.id,
                  type: 'water',
                  createdAt: today.getTime(),
                  severity: 'low'
                })
              }
              break;
            case 0:
            default:
              break;
          }
          return thisPlantsEvents
        })
        .flat()

      console.log('oldEvents', existingEvents)
      console.log('newEvents', newEvents)

      const updatedExistingEvents = existingEvents
        .map((event: any) => {
          const incomingRepeatEvent = newEvents
            .find((newEvent: any) => newEvent.plantId === event.plantId && newEvent.type === event.type)

          if (incomingRepeatEvent) {
            return {
              ...event,
              ...incomingRepeatEvent,
              severity: event.severity === 'low' ? 'medium' : 'high'
            }
          } else {
            return event
          }
        })

      const updatedEvents = newEvents.reduce((acc: any, event: any) => {
        if (!acc.find((existingEvent: any) => existingEvent.plantId === event.plantId && existingEvent.type === event.type)) {
          acc.push(event)
        }
        return acc
      }, [...updatedExistingEvents])
      console.log('updated events', updatedEvents)
    } else {
      console.log('Events created in the last 24 hours, skipping update', existingEvents)
    }
  }, [plants, eventsLastCreatedAt])

  useEffect(() => {
    setCurrentEventId(existingEvents[0].id)
  }, [existingEvents])

  function goToPreviousEvent() {
    const currentEventIndex = existingEvents.findIndex((event: any) => event.id === currentEventId)
    const previousEventIndex = currentEventIndex - 1 < 0 ? existingEvents.length - 1 : currentEventIndex - 1
    setCurrentEventId(existingEvents[previousEventIndex].id)
  }

  function goToNextEvent() {
    const currentEventIndex = existingEvents.findIndex((event: any) => event.id === currentEventId)
    const nextEventIndex = currentEventIndex + 1 >= existingEvents.length ? 0 : currentEventIndex + 1
    setCurrentEventId(existingEvents[nextEventIndex].id)
  }

  function handleEventSkip() {
    goToNextEvent()
  }

  function handleEventComplete() {
    goToNextEvent()
  }

  function generateEventCards() {
    if (plants && Object.keys(plants).length > 0) {
      const eventCards = existingEvents
        .map((event: any) => {
          console.log('event', event)
          console.log('plants', plants)
          const plant: Plant | any = plants[event.plantId]
          return (
            <Paper
              key={event.id}
              elevation={10}
              style={{
                minWidth: '240px',
                width: '60%',
                maxWidth: '300px',
                display: event.id === currentEventId ? 'flex' : 'none',
                flexFlow: 'column nowrap'
              }}
            >
              <Typography variant='h5'>{plant.name || '???'}</Typography>
              <img src={plant.imageData} alt="plant fill image" style={{ width: '100%' }} />
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems='center'
                alignContent='center'
              >
                <SkipButton 
                  handleEventSkip={() => handleEventSkip()}
                />
                <DoneButton 
                  handleEventComplete={() => handleEventComplete()}
                />
              </Grid>
            </Paper>
          )
        })
      return eventCards
    }
    return <Typography>Nothing to do today!</Typography>
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
      {existingEvents.length > 0
        ? (
          <>
            <Button
              onClick={goToPreviousEvent}
              style={{
                display: existingEvents.length > 1 ? 'flex' : 'none',
                height: '100%'
              }}
            >
              <ArrowBackIosNewIcon style={{ fontSize: '48' }} />
            </Button>
            {generateEventCards()}
            <Button
              onClick={goToNextEvent}
              style={{
                display: existingEvents.length > 1 ? 'flex' : 'none',
                height: '100%',
              }}
            >
              <ArrowForwardIosIcon
                style={{ fontSize: '48' }}
              />
            </Button>
          </>
        )
        : <Typography>Nothing to do today!</Typography>
      }
    </Container>

  );
}

function SkipButton({ handleEventSkip }: { handleEventSkip: MouseEventHandler}) {
  return (
    <Button
      onClick={handleEventSkip}
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

function DoneButton({ handleEventComplete }: { handleEventComplete: MouseEventHandler}) {
  return (
    <Button
      onClick={handleEventComplete}
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
      <Link to="/camera">
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
      </Link>
    </div>
  );
}

export default SplashPage;
