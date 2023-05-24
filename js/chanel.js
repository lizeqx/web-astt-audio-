const fileInput = document.getElementById('file-input');

function loadFFmpeg(file) {
  const module = {};

  const onRuntimeInitialized = () => {
    const command = ['-i', file.name];
    const result = module.exports.run(command.length, command);

    const output = module.exports.readUTF8FromMemory(result, 512);
    const channelsRegex = /Audio: .*, (\d+) channels/i;
    const matches = channelsRegex.exec(output);

    if (matches) {
      const channels = parseInt(matches[1]);
      console.log('Audio Channels:', channels);
    } else {
      console.log('Failed to retrieve audio channels');
    }
  };

  const path = 'path/to/ffmpeg.wasm'; // Replace with the actual path to ffmpeg.wasm

  WebAssembly.instantiateStreaming(fetch(path), module)
    .then((instance) => {
      module.instance = instance;
      module.exports = instance.exports;
      module.onRuntimeInitialized = onRuntimeInitialized;

      if (module.exports) {
        module.onRuntimeInitialized();
      }
    })
    .catch((error) => {
      console.error('Failed to load FFmpeg:', error);
    });
}

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  loadFFmpeg(file);
});
