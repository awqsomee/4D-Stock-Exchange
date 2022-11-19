import React from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player'
import loader from '../../../assets/animate Icon/loader.json'

const PageLoader = () => {
  return (
    <div className="loader">
      <Player
        autoplay
        loop
        src={loader}
        style={{ height: '100px', width: '100px' }}
      ></Player>
    </div>
  )
}

export default PageLoader
