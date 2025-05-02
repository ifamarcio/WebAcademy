const customName = document.getElementById('customName');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// 🎯 Texto base com placeholders
let storyText = 'Hoje, :insertx: acelerou sua máquina pela :inserty:. Ele atingiu :insertz: km/h sem pensar duas vezes! Todos ficaram impressionados com a coragem de :insertx:.';

const insertX = ['Carlos Turbo', 'Márcio Nitroso', 'Ana Drift'];
const insertY = ['rodovia deserta', 'pista de arrancada', 'estrada da montanha'];
const insertZ = ['180', '220', '260'];

randomize.addEventListener('click', result);

function result() {
  let newStory = storyText;

  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  newStory = newStory.replace(/:insertx:/gi, xItem);
  newStory = newStory.replace(/:inserty:/gi, yItem);
  newStory = newStory.replace(/:insertz:/gi, zItem);

  if (customName.value !== '') {
    newStory = newStory.replace(xItem, customName.value);
  }

  if (document.getElementById('uk').checked) {
    const speedKmh = parseInt(zItem);
    const speedMph = Math.round(speedKmh / 1.609) + ' mph';
    newStory = newStory.replace(zItem + ' km/h', speedMph);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}
