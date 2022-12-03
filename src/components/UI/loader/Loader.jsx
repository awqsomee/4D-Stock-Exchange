import React from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player'
import loader from '../../../assets/animate Icon/loader.json'
import './loader.css'

const Loader = () => {
  return (
    <div className="loader">
      <Player autoplay loop src={loader} style={{ height: '50px', width: '50px' }}></Player>
    </div>
  )
}

export default Loader
