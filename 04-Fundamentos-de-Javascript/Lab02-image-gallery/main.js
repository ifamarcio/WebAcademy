const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

// Lista com nomes das imagens
const imageList = [
  'imagem1.jpg',
  'imagem2.jpg',
  'imagem3.jpg',
  'imagem4.jpg',
  'imagem5.jpg'
];

// Cria as miniaturas
imageList.forEach(file => {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', `images/${file}`);
  newImage.setAttribute('alt', `Miniatura de ${file}`);
  thumbBar.appendChild(newImage);

  newImage.addEventListener('click', () => {
    displayedImage.setAttribute('src', `images/${file}`);
  });
});
