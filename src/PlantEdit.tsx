import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updatePlant, removePlant, clearSelectedPlant } from './appSlice'
import { Link } from 'react-router-dom'
import Slider from '@mui/material/Slider';
import AirIcon from '@mui/icons-material/Air';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import CloudIcon from '@mui/icons-material/Cloud';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Button, Tooltip } from '@mui/material';
import ParkIcon from '@mui/icons-material/Park';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import plantPNG from './assets/plant.png';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ReplyIcon from '@mui/icons-material/Reply';
import Checkbox from '@mui/material/Checkbox';
import { Plant } from './types'
import { v4 as uuid } from 'uuid';

const plantWaterNeedsMarks = [
  {
    value: 0,
    label: 'None'
  },
  {
    value: 25,
    label: 'Rarely',
  },
  {
    value: 50,
    label: 'Weekly',
  },
  {
    value: 75,
    label: 'Often',
  },
  {
    value: 100,
    label: 'Daily',
  }
]

const plantSunNeedsMarks = [
  {
    value: 0,
    label: 'Shade'
  },
  {
    value: 50,
    label: 'Part Sun',
  },
  {
    value: 100,
    label: 'Full Sun',
  }
]

const plantAgeMarks = [
  {
    value: 0,
    label: 'Seed'
  },
  {
    value: 33,
    label: 'Seedling',
  },
  {
    value: 66,
    label: 'Adult',
  },
  {
    value: 100,
    label: 'Elder',
  }
];

function valuetext(value: number) {
  return `${value}`;
}

const plantDefaults: Plant = {
  id: uuid(),
  name: '',
  description: '',
  imageData: '',
  species: '',
  wateringFrequency: 75,
  sunNeeds: 100,
  age: 0,
  isAlive: true,
  isOutdoor: true,
  lastWatered: 0,
  lastFertilized: 0,
  planted: Date.now(),
  diseases: [],
  resistsDiseases: [],
  pests: [],
  detersPests: [],
  isNative: false,
  isKeystone: false,
  isImportant: false,
  isPerennial: false,
  isEdible: false,
  isMedicinal: false,
  zone: '4b',
  inGuild: false,
  guildId: '',
  isNitrogenFixer: false,
  isAggressive: false,
  isInvasive: false,
  spreads: false,
  growsTall: false,
  isToxic: false,
  isPartlyToxic: false,
  isDangerous: false,
  // isHarvested: false,
  // isReplanted: false,
  // isDiseased: false,
  // isWeeded: false,
  // isPollinated: false,
  // isPruned: false,
  // isPotted: false,
  // isStaked: false,
  // isTrellised: false,
  // isTrained: false,
  // isGrafted: false,
  // isBudded: false,
  // isLayered: false,
  // isAirLayered: false,
  // isMarcotted: false,
  // isBonsai: false,
  // isEspaliered: false,
  // isCoppiced: false,
  // isPollarded: false,
  // isCandied: false,
  // isCordon: false,
  // isFan: false,
  // isSpindle: false,
  // isStepover: false,
  // isCandelabra: false,
  // isUmbrella: false,
}

export default function PlantEdit() {
  const dispatch = useDispatch()
  const plantId = useSelector((state: any) => state.app.selectedPlantId)
  const plants = useSelector((state: any) => state.app.plants)
  const defaultSettings = useSelector((state: any) => state.app.user.settings)
  const goToPlantsRef: any = useRef(null)
  const goToCameraRef: any = useRef(null)

  const [plant, setPlant] = useState({
    ...plantDefaults,
    // ...(defaultSettings?.defaultIsOutdoor && { isOutdoor: defaultSettings.defaultIsOutdoor }),
    // ...(defaultSettings?.defaultWateringFrequency && { wateringFrequency: defaultSettings.defaultWateringFrequency }),
    // ...(defaultSettings?.defaultSunNeeds && { sunNeeds: defaultSettings?.defaultSunNeeds }),
    ...plants[plantId]
  })
  console.log('plant', plant)
  useEffect(() => {
    dispatch(updatePlant(plant as Plant | any))
  }, [plant])

  function handlePlantValueChange(event: any, key: string) {
    console.log('handlePlantValueChange', plant, key, event.target.value, event.target.checked)

    const checkboxKeys = [
      'isOutdoor',
      'isPerennial',
      'isEdible',
      'isMedicinal',
      'isNative',
      'isKeystone',
      'isImportant',
      'isNitrogenFixer',
      'isAggressive',
      'isInvasive',
      'spreads',
      'growsTall',
      'isToxic',
      'isPartlyToxic',
      'isDangerous',
      'inGuild',
    ]

    setPlant({
      ...plant,
      [key]: checkboxKeys.includes(key) ? event.target.checked : event.target.value
    })
  }

  function handleRemovePlant() {
    console.log('handleRemovePlant')
    goToPlantsRef.current.click()
    dispatch(removePlant({ id: plant.id } as any))
    dispatch(clearSelectedPlant())
  }

  function addNewPlant() {
    console.log('addNewPlant')
    goToCameraRef.current.click()
    dispatch(clearSelectedPlant())
  }

  return (
    <div
      className="Plant"
      style={{
        height: '94%',
        textAlign: 'center',
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflowY: 'scroll',
        overflowX: 'hidden'
      }}
    >
      <Paper
        style={{
          width: '100%',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: 'lightblue',
          padding: '0.5em'
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexFlow: 'row nowrap',
          }}
        >
          <Box sx={{
            width: '25%',
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
          }} >
            <Tooltip title='Add Another Plant' placement='top'>
              <Button
                variant='contained'
                color='success'
                onClick={addNewPlant}
                style={{
                  height: '50%',
                  display: 'flex',
                  flexFlow: 'column nowrap',
                }}
              >
                <ReplyIcon fontSize='medium' />
                <AddAPhotoOutlinedIcon fontSize='medium' />
              </Button>
            </Tooltip>
          </Box>
          <Box sx={{
            width: '75%',
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
          }} >
            <CardMedia
              component="img"
              image={plant.imageData || plantPNG}
              alt={plant.name || 'Unnamed Plant'}
              style={{
                width: '200px',
                height: '200px',
                margin: '1em',
                backgroundColor: 'grey'
              }}
            />
          </Box>
          <Box sx={{
            width: '25%',
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
          }} >
            <Tooltip title='Remove Plant' placement='top'>
              <Button
                variant='contained'
                color='error'
                size='small'
                style={{
                  display: 'flex',
                  flexFlow: 'column nowrap',
                }}
                onClick={handleRemovePlant}
              >
                <DeleteForeverIcon fontSize='medium' />
              </Button>
            </Tooltip>
          </Box>

        </div>
        <Card
          style={{
            width: '95%',
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <TextField
            id="plant-name-input"
            label="Plant Name"
            value={plant.name}
            onChange={(event) => handlePlantValueChange(event, 'name')}
            variant="standard"
            style={{
              width: '80%'
            }}
          />
          <TextField
            id="plant-name-input"
            label="Species"
            value={plant.species}
            onChange={(event) => handlePlantValueChange(event, 'species')}
            helperText={!plant.species ? 'Ex: Lavandula spica' : ' '}
            variant='standard'
            style={{
              width: '80%'
            }}
          />
          <TextField
            id="plant-name-input"
            label="Description"
            value={plant.description}
            onChange={(event) => handlePlantValueChange(event, 'description')}
            multiline
            rows={3}
            style={{
              width: '80%',
              margin: '1em'
            }}
          />
          <Box sx={{ width: '100%', margin: '1em' }}>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} justifyContent='center' alignItems="center">
              <Tooltip title="No Watering" placement="top">
                <WaterDropOutlinedIcon color='primary' />
              </Tooltip>
              <Tooltip title="Watering Needs" placement="top">
                <Slider
                  aria-label="Watering Needs Slider"
                  defaultValue={75}
                  value={plant.wateringFrequency}
                  onChange={(event) => handlePlantValueChange(event, 'wateringFrequency')}
                  getAriaValueText={valuetext}
                  step={25}
                  marks={plantWaterNeedsMarks}
                  style={{
                    width: '60%',
                    margin: '0 1em'
                  }}
                />
              </Tooltip>
              <Tooltip
                title="A lot of watering"
                placement="top"
                style={{
                  margin: 0
                }}
              >
                <WaterDropIcon color='primary' />
              </Tooltip>
            </Stack>
          </Box>
          <Box sx={{ width: '100%', margin: '1em' }}>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} justifyContent='center' alignItems="center">
              <Tooltip title="Full Shade" placement="top">
                <CloudIcon color='primary' />
              </Tooltip>
              <Tooltip title="Sun Needs" placement="top">
                <Slider
                  aria-label="Sun Needs Slider"
                  value={plant.sunNeeds}
                  onChange={(event) => handlePlantValueChange(event, 'sunNeeds')}
                  getAriaValueText={valuetext}
                  step={50}
                  marks={plantSunNeedsMarks}
                  style={{
                    width: '60%',
                    margin: '0 1em'
                  }}
                />
              </Tooltip>
              <Tooltip
                title="Full Sun"
                placement="top"
                style={{
                  margin: 0
                }}
              >
                <LightModeIcon color='primary' />
              </Tooltip>
            </Stack>
          </Box>
          <Box sx={{ width: '100%', margin: '1em' }}>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} justifyContent='center' alignItems="center">
              <Tooltip title="Seed" placement="top">
                <ChildFriendlyIcon color='primary' />
              </Tooltip>
              <Tooltip title="Sun Needs" placement="top">
                <Slider
                  aria-label="Sun Needs Slider"
                  value={plant.age}
                  onChange={(event) => handlePlantValueChange(event, 'age')}
                  getAriaValueText={valuetext}
                  step={33.4}
                  marks={plantAgeMarks}
                  style={{
                    width: '60%',
                    margin: '0 1em'
                  }}
                />
              </Tooltip>
              <Tooltip
                title="Elder"
                placement="top"
                style={{
                  margin: 0
                }}
              >
                <ParkIcon color='primary' />
              </Tooltip>
            </Stack>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Indoor</Typography>
            <Switch
              checked={plant.isOutdoor}
              onChange={(event) => handlePlantValueChange(event, 'isOutdoor')}
            />
            <Typography>Outdoor</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Annual</Typography>
            <Switch
              checked={plant.isPerennial}
              onChange={(event) => handlePlantValueChange(event, 'isPerennial')}
            />
            <Typography>Perennial</Typography>
          </Stack>
          <Stack
            direction='row'
            useFlexGap
            spacing={{ xs: 1, sm: 2 }}
            flexWrap='wrap'
            style={{
              padding: '0.5em'
            }}
          >
            <FormControlLabel control={<Checkbox
              checked={plant.isImportant}
              onChange={(event) => handlePlantValueChange(event, 'isImportant')}
            />} label="Important" />
            <FormControlLabel control={<Checkbox
              checked={plant.isNative}
              onChange={(event) => handlePlantValueChange(event, 'isNative')}
            />} label="Native" />
            <FormControlLabel control={<Checkbox
              checked={plant.isEdible}
              onChange={(event) => handlePlantValueChange(event, 'isEdible')}
            />} label="Edible" />
            <FormControlLabel control={<Checkbox
              checked={plant.isMedicinal}
              onChange={(event) => handlePlantValueChange(event, 'isMedicinal')}
            />} label="Medicinal" />
            <FormControlLabel control={<Checkbox
              checked={plant.isKeystone}
              onChange={(event) => handlePlantValueChange(event, 'isKeystone')}
            />} label="Keystone" />
            <FormControlLabel control={<Checkbox
              checked={plant.inGuild}
              onChange={(event) => handlePlantValueChange(event, 'inGuild')}
            />} label="Guild" />
            <FormControlLabel control={<Checkbox
              checked={plant.isNitrogenFixer}
              onChange={(event) => handlePlantValueChange(event, 'isNitrogenFixer')}
            />} label="Nitrogen Fixer" />
            <FormControlLabel control={<Checkbox
              checked={plant.spreads}
              onChange={(event) => handlePlantValueChange(event, 'spreads')}
            />} label="Spreads" />
            <FormControlLabel control={<Checkbox
              checked={plant.growsTall}
              onChange={(event) => handlePlantValueChange(event, 'growsTall')}
            />} label="Grows Tall" />
            <FormControlLabel control={<Checkbox
              checked={plant.isAggressive}
              onChange={(event) => handlePlantValueChange(event, 'isAggressive')}
            />} label="Aggressive" />
            <FormControlLabel control={<Checkbox
              checked={plant.isToxic}
              onChange={(event) => handlePlantValueChange(event, 'isToxic')}
            />} label="Toxic" />
            <FormControlLabel control={<Checkbox
              checked={plant.isPartlyToxic}
              onChange={(event) => handlePlantValueChange(event, 'isPartlyToxic')}
            />} label="Partly Toxic" />
            <FormControlLabel control={<Checkbox
              checked={plant.isInvasive}
              onChange={(event) => handlePlantValueChange(event, 'isInvasive')}
            />} label="Invasive" />
            <FormControlLabel control={<Checkbox
              checked={plant.isDangerous}
              onChange={(event) => handlePlantValueChange(event, 'isDangerous')}
            />} label="Dangerous" />
          </Stack>


        </Card>
        <Card
          style={{
            width: '95%',
            minHeight: '100px',
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'flex-start',
            margin: '1em',
            alignItems: 'center',
          }}
        >
          <Typography variant='h6'>Add Note</Typography>
        </Card>
      </Paper>
      <Link
        ref={goToPlantsRef}
        to="/plants"
        style={{
          display: 'none'
        }}
      >
      </Link>
      <Link
        ref={goToCameraRef}
        to="/camera"
        style={{
          display: 'none'
        }}
      >
      </Link>
    </div>
  )
}

