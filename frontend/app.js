
let btn = document.querySelector("#resizeBtn");
let height = document.querySelector("#height");
let width = document.querySelector("#width");
let form = document.getElementById('form');
let select = document.querySelector("#select");
let filename = '';

//handel Upload Image
form.addEventListener('submit', async (e) => {
    e.preventDefault();  

    localStorage.setItem('filename', filename);
    let formData = new FormData(form);

    try {
      const response = await fetch('http://localhost:3000/uploadImg', {
        method: 'POST',
        body: formData,
      });

      const result = await response.text();
      console.log(result);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  });


  // resize Image 
btn.addEventListener("click",e =>{
  resizeImage(filename, width.value, height.value);
});


async function resizeImage(filename, width, height) {
  try {
    if (width <= 10 || height <= 10) {
      alert('Minimum width and height should be 10');
      return;
    } else if (width > 500 || height > 500) {
      alert('Maximum width and height should be 500');
      return;
    }else if (!(filename != '')) {
      alert('Please select an image first');
      return;}else {
      const url = `http://localhost:3000/api/imgs/resize?filename=${encodeURIComponent(filename)}&width=${width}&height=${height}`;
      open(url, '_blank');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}


// add options to select
async function fetchImages() {
  try {
    const response = await fetch('http://localhost:3000/list-files');
    const images = await response.json();
     images.forEach(image => {
      const img = document.createElement('img');
      img.src = `../imgs/originals/${image}`;
      select.appendChild(img);  
      img.addEventListener('click', () => {
        select.querySelectorAll('img').forEach(img => img.classList.remove('selected'));
        img.classList.add('selected');
        filename = image.replace(".jpg", '');
        console.log(`Selected image: ${filename}`);
      });
    })} catch (error) {
    console.error('Error fetching images:', error);
  }
}
window.addEventListener('DOMContentLoaded', () => {
  fetchImages();
});