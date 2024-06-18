import React, { useState } from 'react';
import {saveToken, setAuthHeader, getToken} from '../tokenService';
import axios from 'axios';

const ImageUpload = ({ onImageUpload, id }) => {
    const [selectedFile, setSelectedFile] = useState(null);
  
    const handleImageUpload = async (event) => {
      const file = event.target.files[0]; 
      setSelectedFile(file);
      onImageUpload(file); 
      
      var projectId = id; 
      console.log(projectId)
      await uploadImageToServer(file, projectId); 
    };
  
    return (
      <div>
        <input type="file" accept="image/png" onChange={handleImageUpload} />
      </div>
    );
  };
  

async function uploadImageToServer(file, projectId) {
    const formData = new FormData();
    formData.append('files[]', file);
  
    try {
      const response = await axios.post(`http://127.0.0.1:5000/add_image_for_project/${projectId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getToken()}`
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  }

export default ImageUpload;