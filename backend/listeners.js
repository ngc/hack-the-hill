const handleImageUpload = async (imageData) => {
    const formData = new FormData();
    formData.append('image', imageData);
  
    try {
      const response = await fetch('http://localhost:3000/detectColors', {
        method: 'POST',
        body: formData,
      });
      const colors = await response.json();
      console.log(colors);
    } catch (err) {
      console.error(err);
    }
  };