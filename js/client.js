let ffmpeg;

function loadFFmpeg() {
  return new Promise((resolve, reject) => {
    const module = {};

    const onRuntimeInitialized = () => {
      resolve(module);
    };

    const path = 'path/to/ffpemg.wasm'; // Replace with the actual path to ffpemg.wasm

    fetch('/web-astt-audio/ffmpeg.wasm')
      .then(response => response.arrayBuffer())
      .then(buffer => WebAssembly.instantiate(buffer, module))
      .then(({ instance }) => {
        module.instance = instance;
        module.exports = instance.exports;
        module.onRuntimeInitialized = onRuntimeInitialized;

        if (module.exports) {
          module.onRuntimeInitialized();
        }
      })
      .catch((error) => {
        console.error(error);
        module.onInstantiateError(error);
      });
  });
}

function getAudioDuration(file) {
  const command = ['-i', file.name];
  const result = ffmpeg.exports.run(command.length, command);

  const output = ffmpeg.exports.readUTF8FromMemory(result, 512);
  const durationRegex = /Duration: (\d{2}):(\d{2}):(\d{2})/i;
  const matches = durationRegex.exec(output);

  if (matches) {
    const hours = parseInt(matches[1]);
    const minutes = parseInt(matches[2]);
    const seconds = parseInt(matches[3]);

    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    const totalMinutes = Math.floor(totalSeconds / 60);

    console.log('Duration:', totalMinutes, 'minutes');
  } else {
    console.log('Failed to retrieve duration');
  }
}

function handleFileInputChange(event) {
  const file = event.target.files[0];
  getAudioDuration(file);
}

document.getElementById('file-input').addEventListener('change', handleFileInputChange);

loadFFmpeg()
  .then((module) => {
    ffmpeg = module;
    console.log('FFmpeg loaded successfully');
  })
  .catch((error) => {
    console.error('Failed to load FFmpeg:', error);
  });
