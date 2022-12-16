import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar-edit'
import ModalBoxDeposit from '../UI/ModalBox/ModalBoxDeposit'

const CropAvatar = (props) => {
  const [modalBoxBigFile, setModalBoxBigFile] = useState(false)

  useEffect(() => {
    if (modalBoxBigFile) {
      const timeId = setTimeout(() => {
        setModalBoxBigFile(false)
      }, 1500)
      return () => {
        clearTimeout(timeId)
      }
    }
  }, [modalBoxBigFile])

  function onClose() {
    props.setAvatar(props.avatar)
  }
  function onCrop(pv) {
    props.setAvatar(pv)
  }
  function onBeforeFileLoad(elem) {
    if (elem.target.files[0].size > 2000000) {
      console.log(elem.target.files[0].size)
      props.setAvatar(props.avatar)
      elem.target.value = ''
      setModalBoxBigFile(true)
    }
  }
  return (
    <div style={{ marginBottom: '40px', borderRadius: '50px' }}>
      <ModalBoxDeposit visible={modalBoxBigFile} setVisible={setModalBoxBigFile} alertStatus={500}>
        <div>Выбранный файл слишком большой</div>
      </ModalBoxDeposit>
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
