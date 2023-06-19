import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearSelectedPlant, setSelectedPlant } from './appSlice'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from "react-router-dom";
import { CardActionArea, CardActions } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CreateIcon from '@mui/icons-material/Create';
import Paper from '@mui/material/Paper';
import OpacityIcon from '@mui/icons-material/Opacity';
import LightModeIcon from '@mui/icons-material/LightMode';
import Tooltip from '@mui/material/Tooltip';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import Grid from '@mui/material/Grid';

function getWateringFrequency(plant: any) {
  switch (plant.wateringFrequency) {
    case 0:
      return 'N/A'
    case 25:
      return 'Minimal'
    case 50:
      return 'Weekly'
    case 75:
      return 'Odd days'
    case 100:
      return 'Daily'
    default:
      return '???'
  }
}

function getSunNeeds(plant: any) {
  switch (plant.sunNeeds) {
    case 0:
      return 'Shade'
    case 50:
      return 'Partial'
    case 100:
      return 'Full'
    default:
      return '???'
  }
}

export default function Plants() {
  const dispatch = useDispatch();
  const goToPlantRef: any = useRef(null);
  const goToPlantEditRef: any = useRef(null);
  const [plantId, setPlantId] = useState(null)
  const plants = useSelector((state: any) => Object.values(state.app.plants))
  const selectedPlantId: string = useSelector((state: any) => state.app.selectedPlantId)

  useEffect(() => {
    if (selectedPlantId) {
      (document.getElementById(selectedPlantId) as any).scrollIntoView();
    } else {
      console.log('no plant selected')
    }
    console.log('Plants Page plants load', plants)
  }, [selectedPlantId, plants])

  function handleCardClick(plantId: String) {
    console.log('card click', plantId)
    dispatch(setSelectedPlant({
      id: plantId
    } as any))
    goToPlantRef.current.click()
  }

  function handleSettingsClick(plantId: String) {
    console.log('settings click', plantId)
    dispatch(setSelectedPlant({
      id: plantId
    } as any))
    goToPlantEditRef.current.click()
  }

  function generatePlantsTable() {
    return plants.map((plant: any, index) => {
      console.log('plant', plant)
      return (
        <Paper
          key={plant.id}
          id={plant.id}
          elevation={5}
          style={{
            height: '100px',
            margin: '0.3em',
            backgroundColor: 'antiquewhite',
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'flex-start'
          }}
        >
          <CardActionArea
            onClick={() => handleCardClick(plant.id)}
            style={{
              width: '100px',
              height: '100px',
            }}
          >
            <CardMedia
              component="img"
              image={plant.imageData || "src/assets/plant.png"}
              alt={plant.name || 'Unnamed Plant'}
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: 'grey',
                display: 'flex',
                flexFlow: 'column nowrap',
                justifyContent: 'space-between'
              }}
            />
          </CardActionArea>
          <CardContent
            style={{
              margin: 0,
              padding: 0,
              width: '100%',
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'space-between'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'space-between'
              }}
            >
              <CardActionArea
                onClick={() => handleCardClick(plant.id)}
              >
                <Typography
                  variant="h5"
                  style={{
                    marginLeft: '0.1em'
                  }}
                >
                  {plant.name || 'Unnamed Plant'}
                </Typography>
              </CardActionArea>
              <Tooltip title="Edit Plant" placement="top">
                <Button
                  onClick={() => handleSettingsClick(plant.id)}
                  size="large"
                  color='secondary'
                  style={{ padding: 0, margin: 0 }}
                >
                  <SettingsIcon />
                </Button>
              </Tooltip>
            </div>

            <CardActions
              style={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Grid
                container
              >
                <Grid item xs={6}>
                  <Tooltip title="Water Needs" placement="top">
                    <OpacityIcon fontSize='small' />
                  </Tooltip>
                </Grid>
                <Grid item xs={6}>
                  <Tooltip title="Sun Needs" placement="top">
                    <LightModeIcon fontSize='small' />
                  </Tooltip>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontSize='small'>{getWateringFrequency(plant)}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontSize='small'>{getSunNeeds(plant)}</Typography>
                </Grid>
              </Grid>
              <Tooltip title="Water Plant" placement="top">
                <Button variant="contained" size="large" color="primary">
                  <WaterDropIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Add Note" placement="top">
                <Button variant="contained" size="small" color="secondary">
                  <CreateIcon />
                </Button>
              </Tooltip>
            </CardActions>
          </CardContent>
          <Link
            ref={goToPlantRef}
            to={`/plants/${plant.id}`}
            style={{
              display: 'none'
            }}
          />
          <Link
            ref={goToPlantEditRef}
            to={`/plants/${plant.id}/edit`}
            style={{
              display: 'none'
            }}
          />
        </Paper>
      )
    })
  }

  return (
    <Container
      disableGutters
      className="Plants"
      style={{
        textAlign: 'center',
        minHeight: '94%',
        maxHeight: '94%',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        overflowY: 'scroll',
        color: 'lightgreen'
      }}
    >
      <div
        style={{
          width: '100%'
        }}
      >
        {generatePlantsTable()}
      </div>
    </Container>
  )
}
