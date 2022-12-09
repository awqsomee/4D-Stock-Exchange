import React from 'react'
import Avatar from 'react-avatar-edit'

const CropAvatar = (props) => {
  function onClose() {
    props.setAvatar(props.avatar)
  }
  function onCrop(pv) {
    props.setAvatar(pv)
  }
  function onBeforeFileLoad(elem) {
    if (elem.target.files[0].size > 2000000) {
      alert('File is too big!')
      elem.target.value = ''
    }
  }
  return (
    <div style={{ marginBottom: '40px', borderRadius: '50px' }}>
      <Avatar
        height={600}
        width="auto"
        onCrop={onCrop}
        onClose={onClose}
        onBeforeFileLoad={onBeforeFileLoad}
        src={props.file}
        cropRadius={296}
      />
    </div>
  )
}

export default CropAvatar
