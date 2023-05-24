const ffmpeg = require('fluent-ffmpeg');

function getAudioDuration(inputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(inputPath, (err, metadata) => {
      if (err) {
        reject(err);
        return;
      }

      const durationInSeconds = metadata.format.duration;
      const durationInMinutes = Math.floor(durationInSeconds / 60);

      resolve(durationInMinutes);
    });
  });
}

const inputPath = 'path/to/input.mp3'; // Replace with the actual path to the input audio file

getAudioDuration(inputPath)
  .then(durationInMinutes => {
    console.log(`Audio duration: ${durationInMinutes} minutes`);
  })
  .catch(error => {
    console.error('Error retrieving audio duration:', error);
  });
