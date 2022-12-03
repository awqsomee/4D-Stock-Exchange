import React from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player'
import loader from '../../../assets/animate Icon/loader.json'

const ButtonLoader = () => {
  return (
    <div>
      <Player autoplay loop src={loader} style={{ height: '20px', width: '20px' }}></Player>
    </div>
  )
}

export default ButtonLoader
