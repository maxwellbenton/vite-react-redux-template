import React, { useState, useRef } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import {
  Link, useLocation
} from "react-router-dom";
import GrassOutlinedIcon from '@mui/icons-material/GrassOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Tooltip from '@mui/material/Tooltip';
import { useSelector, useDispatch } from 'react-redux'

function Navigation() {
  const isPlantPage = useLocation().pathname.match(/plants\/[a-zA-Z0-9]*/)

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
        {isPlantPage && <LockOrUnlock />}
        <ListButton />
      </Grid>
    </Container >
  );
}

// HELPER COMPONENTS

function HomeButton() {
  return (
    <Tooltip title="Home" placement="top">
      <Link to="/">
        <Button>
          <GrassOutlinedIcon fontSize='large' />
        </Button>
      </Link>
    </Tooltip>

  )
}

function LockOrUnlock() {
  const plantId = useSelector((state: any) => state.app.selectedPlantId)
  const isEditPage = useLocation().pathname.includes('edit')
  return isEditPage
    ? (
      <Tooltip title="Lock" placement="top">
        <Link to={`/plants/${plantId}`}>
          <Button>
            <LockOpenOutlinedIcon fontSize='large' />
          </Button>
        </Link>
      </Tooltip>
    )
    : (
      <Tooltip title="Edit" placement="top">
        <Link to={`/plants/${plantId}/edit`}>
          <Button>
            <LockOutlinedIcon fontSize='large' />
          </Button>
        </Link>
      </Tooltip>
    )
}

function ListButton() {
  return (
    <Tooltip title="List" placement="top">
      <Link to="/plants">
        <Button>
          <FormatListBulletedIcon fontSize='large' />
        </Button>
      </Link>
    </Tooltip>
  )
}

export default Navigation;