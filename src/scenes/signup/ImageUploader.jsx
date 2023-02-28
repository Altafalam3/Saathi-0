import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import firebase from 'firebase/app';

function ImageUploader() {
  const [image, setImage] = useState(null);

  const handleImageDrop = (acceptedFiles) => {
    const uploadTask = firebase.storage().ref().child(`images/${acceptedFiles[0].name}`).put(acceptedFiles[0]);
    uploadTask.on('state_changed', null, null, () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        setImage(downloadURL);
      });
    });
  }

  return (
    <Dropzone onDrop={handleImageDrop}>
      {({getRootProps, getInputProps}) => (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag and drop an image here, or click to select an image</p>
        </div>
      )}
    </Dropzone>
  );
}

export default ImageUploader;
