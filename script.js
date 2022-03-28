// button
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}
// Passing our joke to voiceRSS API
function tellMe(joke) {
  console.log('Tell me', joke);
  VoiceRSS.speech({
    key: 'a31b86a5572d44a3baa951226e3ae80f',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Get Jokes from Jokes API
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://v2.jokeapi.dev/joke/Any?amount=1';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-Speech
    tellMe(joke);
    // disable the button
    toggleButton();
  } catch (err) {
    // Catch Errors Here
    console.log('Whoops', err);
  }
}

//  Event listener
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
