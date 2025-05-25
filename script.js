let model;

async function loadModel() {
  try {
   model = await tf.loadLayersModel('https://huggingface.co/keras-io/mnist-tfjs/resolve/main/model.json');


    console.log("✅ Model loaded");
  } catch (err) {
    console.error("❌ Failed to load model:", err);
  }
}
loadModel();

function previewImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const preview = document.getElementById('preview');
      preview.src = e.target.result;
      preview.style.display = 'block';
      document.getElementById('predictBtn').disabled = false;
    };
    reader.readAsDataURL(file);
  }
}

document.getElementById('fileInput').addEventListener('change', previewImage);

document.getElementById('predictBtn').addEventListener('click', async function () {
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = "Predicting...";

  if (!model) {
    resultDiv.textContent = "❌ Model not loaded";
    return;
  }

  const img = document.getElementById('preview');

  if (!img.complete || img.naturalHeight === 0) {
    resultDiv.textContent = "❌ Invalid image";
    return;
  }

  try {
    let tensor = tf.browser.fromPixels(img, 1);
    tensor = tf.image.resizeNearestNeighbor(tensor, [28, 28]);
    tensor = tensor.mean(2);
    tensor = tensor.toFloat();
    tensor = tensor.expandDims(0);
    tensor = tensor.expandDims(-1);
    tensor = tensor.div(255.0);

    const prediction = await model.predict(tensor).data();
    const predictedDigit = prediction.indexOf(Math.max(...prediction));
    resultDiv.textContent = predictedDigit;
  } catch (err) {
    console.error("Prediction error:", err);
    resultDiv.textContent = "❌ Prediction failed";
  }
});

document.getElementById('feedback').addEventListener('change', function () {
  const correctionBox = document.getElementById('correction');
  if (this.value === 'no') {
    correctionBox.style.display = 'block';
  } else {
    correctionBox.style.display = 'none';
    if (this.value === 'yes') {
      setTimeout(() => alert("✅ Thanks for supporting!"), 300);
    }
  }
});

document.getElementById('submitBtn').addEventListener('click', function () {
  const correctDigit = document.getElementById('correctDigit').value;
  alert(`✅ Thanks! Correct digit submitted: ${correctDigit}`);
});
