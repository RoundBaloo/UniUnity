import React, { useState } from 'react';
import {saveToken, setAuthHeader, getToken} from '../tokenService';
import axios from 'axios';

const ImageUpload = ({ onImageUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
  
    const handleImageUpload = async (event) => {
      const file = event.target.files[0]; // Получаем первый выбранный файл
      setSelectedFile(file);
      onImageUpload(file); // Вызываем колбэк-функцию, переданную в пропсах, если она есть
      // Предположим, что projectId известен заранее или передается через пропсы
      const projectId = 18; // Замените на реальный ID проекта
      await uploadImageToServer(file, projectId); // Отправляем файл на сервер
    };
  
    return (
      <div>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
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
          // Здесь должен быть ваш JWT токен для аутентификации, если он необходим
          'Authorization': `Bearer ${getToken()}`
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  }

export default ImageUpload;