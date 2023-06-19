// @ts-nocheck
import Webcam from "react-webcam";
import React, { useState, useRef } from 'react'
import { Link } from "react-router-dom";
import { Player } from 'video-react';
import { addPlant, setSelectedPlant } from './appSlice'
import { useSelector, useDispatch } from 'react-redux'
import Container from '@mui/material/Container';
import HourglassFullTwoToneIcon from '@mui/icons-material/HourglassFullTwoTone';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import FiberManualRecordTwoToneIcon from '@mui/icons-material/FiberManualRecordTwoTone';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import LoadingScreen from './LoadingScreen';
import { v4 as uuid } from 'uuid';
import './Camera.css'

function Camera() {
  const dispatch = useDispatch();
  const webcamRef = useRef<Webcam | any>({});
  const [cameraReady, setCameraReady] = useState<boolean>(false)
  const [plantId] = useState<string>(uuid())
  const [isMobile] = useState<boolean>(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
  const videoConstraints = {
    facingMode: { exact: isMobile ? "environment" : "user" }
  };

  const inputRef: any = useRef(null);
  const addPlantRef: any = useRef(null);

  function addPhotoAndGoToEdit(imageData: String = '') {
    dispatch(addPlant({
      id: plantId,
      ...(imageData && { imageData })
    } as any))
    dispatch(setSelectedPlant({
      id: plantId
    } as any))
    addPlantRef.current.click()
  }

  function handleAddPhotoClick() {
    inputRef.current.click();
  }

  function handleAddPhoto() {
    addPhotoAndGoToEdit()
  }

  function handleCapture() {
    const imageSrc = webcamRef.current.getScreenshot()
    addPhotoAndGoToEdit(imageSrc)
  }

  function handleSkip() {
    addPhotoAndGoToEdit()
  }

  function handleCameraReady(...args: any) {
    console.log('camera ready', args)
    setCameraReady(true)
  }

  function handleCameraError(...args: any) {
    console.log('camera error', args)
  }

  return (
    <div
      className="Camera"
      style={{
        height: '94%',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        color: 'lightgreen'
      }}
    >
      <Webcam 
        ref={webcamRef}
        onUserMedia={handleCameraReady}
        onUserMediaError={handleCameraError}
        style={{
          backgroundColor: 'grey',
          height: '100%',
          position: 'relative'
        }}
      >
      </Webcam>
      <ButtonGroup
        variant="text"
        color='inherit'
        aria-label="text button group"
        style={{
          position: 'absolute',
          bottom: '4em',
          left: '50%',
          transform: 'translate(-50%)',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center'
        }}
      >
        <Tooltip title="Add File" placement="top">
          <Button
            onClick={handleAddPhotoClick}
            style={{
              fontSize: '62px'
            }}
          >
            <AddPhotoAlternateIcon />
            <input
              id='add-photo-alt'
              ref={inputRef}
              type="file"
              accept=".png, .jpg, .jpeg"
              style={{
                display: 'none'
              }}
              onChange={handleAddPhoto}
            />
          </Button>
        </Tooltip>
        <Tooltip title="Capture" placement="top">
          <Button
            onClick={handleCapture}
          >
            <FiberManualRecordTwoToneIcon style={{
              fontSize: '82px'
            }} />
          </Button>
        </Tooltip>
        <Tooltip title="Skip" placement="top">
          <Button 
            onClick={handleSkip}
            style={{
              fontSize: '62px'
            }}
          >
            <NextPlanIcon />
          </Button>
        </Tooltip>
        <Link 
          ref={addPlantRef} 
          to={`/plants/${plantId}/edit`}
          style={{
            display: 'none'
          }}
        />
      </ButtonGroup>
      <Paper
        style={{
          position: 'absolute',
          bottom: '7%',
          width: '340px',
          height: '92%',
          left: '50%',
          visibility: cameraReady ? 'hidden' : 'visible',
          transform: 'translate(-50%)',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center'
        }}
      >
        <LoadingScreen />
      </Paper>
    </div>
  )
}

export default Camera
