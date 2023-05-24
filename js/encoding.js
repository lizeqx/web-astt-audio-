function getEncoding(file) {
    const command = ['-i', file.name];
    const result = ffmpeg.exports.run(command.length, command);
  
    const output = ffmpeg.exports.readUTF8FromMemory(result, 512);
    const codecRegex = /Audio: (\w+)/i;
    const matches = codecRegex.exec(output);
  
    if (matches) {
      const encoding = matches[1];
      console.log('Encoding/Codec:', encoding);
    } else {
      console.log('Failed to retrieve encoding');
    }
  }
  
  const fileInput = document.getElementById('file-input');
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    getEncoding(file);
  });
  