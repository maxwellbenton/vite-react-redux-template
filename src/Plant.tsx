import { useSelector, useDispatch } from 'react-redux'
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Tooltip, Typography } from '@mui/material';
import OpacityIcon from '@mui/icons-material/Opacity';
import LightModeIcon from '@mui/icons-material/LightMode';
import { styled } from '@mui/material/styles';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ShieldIcon from '@mui/icons-material/Shield';
import TokenOutlinedIcon from '@mui/icons-material/TokenOutlined';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import SuperscriptIcon from '@mui/icons-material/Superscript';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import TokenIcon from '@mui/icons-material/Token';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import plantPNG from './assets/plant.png';
import SpokeOutlinedIcon from '@mui/icons-material/SpokeOutlined';
import SpokeIcon from '@mui/icons-material/Spoke';
import YardOutlinedIcon from '@mui/icons-material/YardOutlined';
import ParkIcon from '@mui/icons-material/Park';

// indoor / outdoor
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HouseIcon from '@mui/icons-material/House';
import LandscapeIcon from '@mui/icons-material/Landscape';

// edible / non-edible
import RestaurantIcon from '@mui/icons-material/Restaurant';
import NoMealsIcon from '@mui/icons-material/NoMeals';

// nitrogen fixer indication
import AgricultureIcon from '@mui/icons-material/Agriculture';

// pest control
import SecurityIcon from '@mui/icons-material/Security';

// ? extra pest control?
import AddModeratorIcon from '@mui/icons-material/AddModerator';

// height/width
import HeightIcon from '@mui/icons-material/Height';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

// pest icon
import PestControlIcon from '@mui/icons-material/PestControl';

// zone icon
import AcUnitIcon from '@mui/icons-material/AcUnit';

// disease icon
import BubbleChartIcon from '@mui/icons-material/BubbleChart';

// dangerous
import DangerousIcon from '@mui/icons-material/Dangerous';

// warning
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

// annual
import EventIcon from '@mui/icons-material/Event';

// perennial
import EventRepeatIcon from '@mui/icons-material/EventRepeat';

// invasive
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';

// aggressive
import NearbyErrorIcon from '@mui/icons-material/NearbyError';

// shade
import RollerShadesClosedOutlinedIcon from '@mui/icons-material/RollerShadesClosedOutlined';
import CloudIcon from '@mui/icons-material/Cloud';

// guild
import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined';

// local
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';

// seedling age
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';

import GrassOutlinedIcon from '@mui/icons-material/GrassOutlined';

// medicinal
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';

const Item = styled(Chip)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  flexGrow: 1,
  // color: theme.palette.text.secondary,
}));

export default function Plant() {
  const plantId = useSelector((state: any) => state.app.selectedPlantId)
  const plants = useSelector((state: any) => state.app.plants)
  const plant = plants[plantId]
  // console.log('PLANT PAGE FOR', plant)

  function getWateringFrequency() {
    // console.log('freq', plant.wateringFrequency)
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

  function getWateringIcon() {
    switch (plant.wateringFrequency) {
      case 0:
        return <ChildFriendlyIcon />
      case 25:
        return <OpacityIcon />
      case 50:
        return <OpacityIcon />
      case 75:
        return <WaterDropIcon />
      case 100:
        return <WaterDropIcon />
      default:
        return <OpacityIcon />
    }
  }

  function getSunNeeds() {
    // console.log('neeeds', plant.sunNeeds)
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

  function getAge() {
    console.log('age', plant.age)
    switch (plant.age) {
      case 0:
        return 'Seed'
      case 33.4:
        return 'Seedling'
      case 66.8:
        return 'Adult'
      case 100:
        return 'Elder'
      default:
        return 'Adult'
    }
  }


  function getAgeIcon() {
    switch (plant.age) {
      case 0:
        return <ChildFriendlyIcon />
      case 33.4:
        return <GrassOutlinedIcon />
      case 66.8:
        return <YardOutlinedIcon />
      case 100:
        return <ParkIcon />
      default:
        return <GrassOutlinedIcon />
    }
  }

  return (
    <Box
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
        <Box>
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
        <Card
          style={{
            width: '95%',
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Typography variant='h5'>{plant.name || 'Unnamed Plant'}</Typography>
          <Typography variant='subtitle2'>{plant.species || 'Unknown species'}</Typography>

          <Box>
            {plant.description}
          </Box>


          <Box
            justifyContent='space-evenly'
            style={{
              display: 'flex',
              flexFlow: 'row wrap',

            }}
          >


            <Stack
              direction='row'
              useFlexGap
              spacing={{ xs: 1, sm: 2 }}
              flexWrap='wrap'
              style={{
                padding: '0.5em'
              }}
            >
              <Tooltip title='Watering needs' placement='top'>
                <Item icon={getWateringIcon()} label={((plant.wateringFrequency || plant.wateringFrequency === 0) && getWateringFrequency()) || '???'} variant='filled' />
              </Tooltip>
              <Tooltip title='Sun needs' placement='top'>
                <Item icon={plant.sunNeeds ? <LightModeIcon /> : <RollerShadesClosedOutlinedIcon />} label={((plant.sunNeeds || plant.sunNeeds === 0) && getSunNeeds()) || '???'} variant='filled' />
              </Tooltip>
              {plant.isOutdoor ? <Item icon={<LandscapeIcon />} label='Outdoor' variant='filled' /> : <Item icon={<HomeOutlinedIcon />} label='Indoor' variant='filled' />}
              {plant.isPerennial ? (
                <Tooltip title='This plant survives winter' placement='top'>
                  <Item icon={<EventRepeatIcon />} label='Perennial' variant='filled' />
                </Tooltip>
              ) : (
                <Tooltip title='This plant does not survive winter' placement='top'>
                  <Item icon={<EventIcon />} label='Annual' variant='filled' />
                </Tooltip>
              )}
              <Tooltip title='Age' placement='top'>
                <Item icon={getAgeIcon()} label={((plant.age || plant.age === 0) && getAge()) || '???'} variant='filled' />
              </Tooltip>
              {plant.isKeystone && (
                <Tooltip title='This plant is critical to the ecosystem' placement='top'>
                  <Item icon={<TokenIcon />} label='Keystone' variant='filled' color='success' />
                </Tooltip>
              )}
              {plant.isNative && (
                <Tooltip title='This is a native species' placement='top'>
                  <Item icon={<LocalActivityOutlinedIcon />} label='Native' variant='filled' color='success' />
                </Tooltip>
              )}
              {plant.inGuild && (
                <Tooltip title='This plant supports others' placement='top'>
                  <Item icon={<Diversity2OutlinedIcon />} label='Guild' variant='filled' color='success' />
                </Tooltip>
              )}
              {plant.isImportant && (
                <Tooltip title='This plant is important' placement='top'>
                  <Item icon={<TokenOutlinedIcon />} label='Important' variant='filled' color='success' />
                </Tooltip>
              )}
              {plant.isEdible && (
                <Tooltip title='Confirm identity before eating' placement='top'>
                  <Item icon={<RestaurantIcon />} label='Edible' variant='filled' color='success' />
                </Tooltip>
              )}
              {plant.isMedicinal && (
                <Tooltip title='Confirm identity before using' placement='top'>
                  <Item icon={<LocalPharmacyIcon />} label='Medicinal' variant='filled' color='success' />
                </Tooltip>
              )}
              {plant.isNitrogenFixer && (
                <Tooltip title='This plant stores nitrogen from the air' placement='top'>
                  <Item icon={<AgricultureIcon />} label='Nitrogen Fixer' variant='filled' color='secondary' />
                </Tooltip>
              )}
              {!plant?.detersPests?.length ? false : (
                <Tooltip title='This plant deters pests' placement='top'>
                  <Item icon={<AddModeratorIcon />} label='Pest Control' variant='filled' color='secondary' />
                </Tooltip>
              )}
              {!plant?.resistsDiseases?.length ? false : (
                <Tooltip title='This plant is disease resistant' placement='top'>
                  <Item icon={<SecurityIcon />} label='Disease resistant' variant='filled' color='secondary' />
                </Tooltip>
              )}
              {plant.spreads && (
                <Tooltip title='This plant expands its footprint' placement='top'>
                  <Item icon={<SwapHorizIcon />} label='Spreads' variant='filled' color='info' />
                </Tooltip>
              )}
              {plant.growsTall && (
                <Tooltip title='This plant may shade out other plants' placement='top'>
                  <Item icon={<HeightIcon />} label='Grows Tall' variant='filled' color='info' />
                </Tooltip>
              )}
              {!plant?.diseases?.length ? false : (
                <Tooltip title='This plant has a disease' placement='top'>
                  <Item icon={<BubbleChartIcon />} label='Disease' variant='filled' color='warning' />
                </Tooltip>
              )}
              {plant.isAggressive && (
                <Tooltip title='This plant will grow quickly' placement='top'>
                  <Item icon={<NearbyErrorIcon />} label='Aggressive' variant='filled' color='warning' />
                </Tooltip>
              )}
              {plant.isPartlyToxic && (
                <Tooltip title='Some of this plant is toxic' placement='top'>
                  <Item icon={<RemoveCircleOutlineIcon />} label='Partly Toxic' variant='filled' color='warning' />
                </Tooltip>
              )}
              {plant.isInvasive && (
                <Tooltip title='This plant is crowding out native plants' placement='top'>
                  <Item icon={<CrisisAlertIcon />} label='Invasive' variant='filled' color='warning' />
                </Tooltip>
              )}
              {plant.isDangerous && (
                <Tooltip title='This plant is not safe!' placement='top'>
                  <Item icon={<DangerousIcon />} label='Dangerous' variant='filled' color='error' />
                </Tooltip>
              )}
              {plant.isToxic && (
                <Tooltip title='Take caution when handling' placement='top'>
                  <Item icon={<WarningAmberIcon />} label='Toxic' variant='filled' color='error' />
                </Tooltip>
              )}
            </Stack>

            {/* <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Venue</TableCell>
                    <TableCell align='right'>Outdoor</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Roots</TableCell>
                    <TableCell align='right'>Transplanted</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Pests</TableCell>
                    <TableCell align='right'>
                      <Tooltip title='insects (inactive)' placement='top'>
                        <PestControlIcon fontSize='small' color='disabled' />
                      </Tooltip>
                      <Tooltip title='disease (inactive)' placement='top'>
                        <BubbleChartIcon fontSize='small' color='disabled'/>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Speciality</TableCell>
                    <TableCell align="right">
                    <Tooltip title='deters pests' placement='top'>
                      <SecurityIcon color='success'/>
                    </Tooltip>
                    <Tooltip title='fixes nitrogen' placement='top'>
                      <AgricultureIcon color='success'/>
                    </Tooltip>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Tooltip title="Edibility" placement='top'>
                        <RestaurantIcon />
                      </Tooltip>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="This plant is not edible" placement='top'>
                        <Typography>No</Typography>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Tooltip title="Poisonous">
                        <WarningAmberIcon />
                      </Tooltip>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="This plant is not poisonous">
                        <Typography>No</Typography>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Tooltip title="Hardiness Zone">
                        <AcUnitIcon />
                      </Tooltip>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Hardiness Zone">
                        <Typography>4b</Typography>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Tooltip title="Height">
                        <HeightIcon />
                      </Tooltip>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Height Range">
                        <Typography>10"-36"</Typography>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Tooltip title="Width">
                        <SwapHorizIcon />
                      </Tooltip>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Width Range">
                        <Typography>5"-20"</Typography>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table> */}
          </Box>

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
          <Typography variant='h6'>Notes</Typography>
        </Card>
      </Paper>
    </Box>
  )
}
