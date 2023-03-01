import React, { useState } from 'react';

const Upload = () => {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    if (image.size < 2000000) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setImageName(image.name);
      };
      reader.readAsDataURL(image);
    } else {
      alert('Image size more than 2MB');
    }
  };

  return (
    <div className="container">
      <input
        type="file"
        id="file"
        accept="image/*"
        hidden
        onChange={handleImageChange}
      />
      <div className={`img-area ${image ? 'active' : ''}`} data-img={imageName}>
        <i className='bx bxs-cloud-upload icon'></i>
        <h3>Upload Image</h3>
        <p>Image size must be less than <span>2MB</span></p>
        {image && <img src={image} alt={imageName} />}
      </div>
      {/* <button className="select-image" onClick={() => document.querySelector('#file').click()}>
        Select Image
      </button> */}
    </div>
  );
};

export default Upload;
