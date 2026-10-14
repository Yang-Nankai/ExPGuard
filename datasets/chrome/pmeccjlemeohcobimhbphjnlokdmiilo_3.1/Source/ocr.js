// ocr.js

window.addEventListener('message', function (event) {
  console.log('OCR iframe received message:', event.data);

  const { imageDataUrl, applyPreprocessing, lang = 'eng' } = event.data;
  const extensionUrl = chrome.runtime.getURL('');

  const image = new Image();
  image.onload = function () {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');

    const width = image.width;
    const height = image.height;
    canvas.width = width;
    canvas.height = height;
    context.drawImage(image, 0, 0, width, height);

    if (applyPreprocessing) {
      console.log('Applying image preprocessing...');
      let imageData = context.getImageData(0, 0, width, height);
      let data = imageData.data;

      // Convert to grayscale
      for (let i = 0; i < data.length; i += 4) {
        let brightness = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        data[i] = data[i + 1] = data[i + 2] = brightness;
      }

      // Otsu threshold
      let threshold = otsuThreshold(data);
      for (let i = 0; i < data.length; i += 4) {
        let value = data[i] >= threshold ? 255 : 0;
        data[i] = data[i + 1] = data[i + 2] = value;
      }

      context.putImageData(imageData, 0, 0);
    }

    const processedImageDataUrl = canvas.toDataURL('image/png');

    // Use external tessdata repository
    // '4.0.0_fast', '4.0.0', or '4.0.0_best' are available. Adjust as needed.
    // '4.0.0_best' is the highest accuracy but largest files.
    const langPath = 'https://tessdata.projectnaptha.com/4.0.0_best';

    Tesseract.recognize(
      processedImageDataUrl,
      lang,
      {
        workerPath: extensionUrl + 'lib/worker.min.js',
        corePath: extensionUrl + 'lib/tesseract-core.wasm.js',
        langPath: langPath,
        workerBlobURL: false,
        logger: m => console.log('Tesseract Logger:', m),
        tessedit_pageseg_mode: Tesseract.PSM.AUTO,
      }
    ).then(({ data }) => {
      const { text, confidence } = data;
      console.log('OCR processing complete.');
      event.source.postMessage({ text, confidence }, '*');
    }).catch(error => {
      console.error('OCR Error:', error);
      event.source.postMessage({ error: error.message }, '*');
    });
  };

  image.onerror = function () {
    console.error("Failed to load image in OCR iframe");
    event.source.postMessage({ error: 'Failed to load image' }, '*');
  };
  image.src = imageDataUrl;
});

function otsuThreshold(data) {
  let histogram = new Array(256).fill(0);
  for (let i = 0; i < data.length; i += 4) {
    histogram[Math.floor(data[i])]++;
  }

  let total = data.length / 4;
  let sum = 0;
  for (let t = 0; t < 256; t++) {
    sum += t * histogram[t];
  }

  let sumB = 0;
  let wB = 0;
  let wF = 0;
  let varMax = 0;
  let threshold = 0;

  for (let t = 0; t < 256; t++) {
    wB += histogram[t];
    if (wB === 0) continue;

    wF = total - wB;
    if (wF === 0) break;

    sumB += t * histogram[t];

    let mB = sumB / wB;
    let mF = (sum - sumB) / wF;
    let varBetween = wB * wF * (mB - mF) ** 2;

    if (varBetween > varMax) {
      varMax = varBetween;
      threshold = t;
    }
  }
  return threshold;
}
