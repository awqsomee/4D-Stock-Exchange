import React, { useState } from 'react'
import Avatar from 'react-avatar-edit'
import ModalBoxDeposit from '../UI/ModalBox/ModalBoxDeposit'

const CropAvatar = (props) => {
  function onClose() {
    props.setAvatar(props.avatar)
  }
  function onCrop(pv) {
    props.setAvatar(pv)
  }
  function onBeforeFileLoad(elem) {
    if (elem.target.files[0].size > 2000000) {
      alert('Файл слишком большой')
      elem.target.value = ''
    }
  }
  return (
    <div style={{ marginBottom: '40px', borderRadius: '50px' }}>
      <Avatar
        height={600}
        width="auto"
        label="Выберите фото"
        labelStyle={{ color: '#fff', fontFamily: 'Play' }}
        imageHeight={600}
        onCrop={onCrop}
        onClose={onClose}
        onBeforeFileLoad={onBeforeFileLoad}
        src={props.file}
        exportQuality={1.0}
        cropRadius={100}
      />
    </div>
  )
}

export default CropAvatar
