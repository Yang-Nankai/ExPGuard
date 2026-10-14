const SAMPLE_RATE = 16000;
const CHUNK_SIZE = SAMPLE_RATE * 0.3; // 300ms chunk size (4800 samples)

class PCMProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.buffer = new Int16Array(CHUNK_SIZE);
    this.bufferIndex = 0;
  }

  process(inputs) {
    const input = inputs[0];

    if (!input || input.length === 0) return true;

    const inputChannel = input[0];
    const len = inputChannel.length;

    // Process samples in bulk
    for (let i = 0; i < len; i++) {
      // Fast path for common case where sample is within [-1, 1]
      const sample = inputChannel[i];

      // Use bitwise operations for conversion
      this.buffer[this.bufferIndex++] =
        sample > 1 ? 32767 : sample < -1 ? -32767 : (sample * 32767) | 0;

      // When the buffer is full, transfer it to the main thread
      if (this.bufferIndex >= CHUNK_SIZE) {
        this.port.postMessage(this.buffer.buffer, [this.buffer.buffer]);
        this.buffer = new Int16Array(CHUNK_SIZE); // Create a new buffer
        this.bufferIndex = 0;
      }
    }

    return true;
  }
}

/*
When you use audioWorklet.addModule('path/to/audio-processor.js'),
the script file (e.g., pcm-processor.js) is loaded into the AudioWorkletGlobalScope,
where registerProcessor is available.
*/
registerProcessor('pcm-processor', PCMProcessor);
