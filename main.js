const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Event listeners for mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

// Event listeners for touch events
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

// Clear button
const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', clearCanvas);

// Guess button
const guessButton = document.getElementById('guess-button');
guessButton.addEventListener('click', guessDrawing);

// Functions for drawing
function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!isDrawing) return;
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(e.offsetX, e.offsetY);
    context.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
    isDrawing = false;
}

// Function for clearing the canvas
function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('result').innerHTML = '';
}

// Function for guessing the drawing
function guessDrawing() {
    // Get the image data from the canvas
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    // Convert the image data to a tensor
    const tensor = tf.browser.fromPixels(imageData, 1);
    // Resize the tensor to 28x28 pixels
    const resized = tf.image.resizeBilinear(tensor, [28, 28])


