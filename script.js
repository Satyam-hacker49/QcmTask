const fileInput = document.getElementById('fileInput');
const previewImg = document.getElementById('preview');
const predictBtn = document.getElementById('predictBtn');
const resultDiv = document.getElementById('result');
const feedbackSelect = document.getElementById('feedback');
const correctionDiv = document.getElementById('correction');
const submitBtn = document.getElementById('submitBtn');
const uploadArea = document.getElementById('uploadArea');

fileInput.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      previewImg.src = e.target.result;
      previewImg.style.display = 'block';
      predictBtn.disabled = false;
    };
    reader.readAsDataURL(file);
  }
});

predictBtn.addEventListener('click', function() {
  resultDiv.textContent = 'Predicting...';
  predictBtn.disabled = true;
  
  setTimeout(() => {
    const randomNumber = Math.floor(Math.random() * 10);
    resultDiv.textContent = randomNumber;
    predictBtn.disabled = false;
  }, 800);
});

feedbackSelect.addEventListener('change', function() {
  if (this.value === 'no') {
    correctionDiv.style.display = 'block';
  } else {
    correctionDiv.style.display = 'none';
    if (this.value === 'yes') {
      alert('Thanks for your feedback!');
    }
  }
});

submitBtn.addEventListener('click', function() {
  const correctDigit = document.getElementById('correctDigit').value;
  alert('Thanks! Correct digit: ' + correctDigit);
});

uploadArea.addEventListener('dragover', function(e) {
  e.preventDefault();
  this.classList.add('drag-over');
});

uploadArea.addEventListener('dragleave', function() {
  this.classList.remove('drag-over');
});

uploadArea.addEventListener('drop', function(e) {
  e.preventDefault();
  this.classList.remove('drag-over');
  if (e.dataTransfer.files.length) {
    fileInput.files = e.dataTransfer.files;
    const event = { target: fileInput };
    fileInput.dispatchEvent(new Event('change'));
  }
});

predictBtn.disabled = true;