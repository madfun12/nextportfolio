const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let maxIterations = 100;

let zoom = 1;
let offsetX = 0;
let offsetY = 0;

const renderMandelbrotSet = () => {
    const width = canvas.width;
    const height = canvas.height;

    // Go through each pixel in the canvas
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const cx = map(x, 0, width, offsetX - 2 * zoom, offsetX + 2 * zoom);
            const cy = map(
                y,
                0,
                height,
                offsetY - 2 * zoom,
                offsetY + 2 * zoom
            );

            const iterationCount = isInMandelBrotSet(cx, cy);

            const lightness = iterationCount === maxIterations ? 0 : 50;
            const hue = 360 * (iterationCount / maxIterations);

            ctx.fillStyle = `hsl(${hue}, 100%, ${lightness}%)`;
            ctx.fillRect(x, y, 1, 1);
        }
    }
};

const isInMandelBrotSet = (cx, cy) => {
    let zx = 0;
    let zy = 0;
    let iteration = 0;

    while (iteration < maxIterations) {
        const zxtemp = zx * zx - zy * zy + cx;
        zy = 2 * zx * zy + cy;
        zx = zxtemp;
        if (zx * zx + zy * zy > 4) {
            return iteration; // Point is not in the Mandelbrot set
        }
        iteration++;
    }
    return iteration;
};

// Function to convert canvas coordinates to complex plan coordinates
function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

canvas.addEventListener("wheel", (event) => {
    event.preventDefault();
    const zoomFactor = Math.sign(event.deltaY) > 0 ? 0.9 : 1.1;
    zoom *= zoomFactor;
    renderMandelbrotSet();
});

let isDragging = false;
let startX;
let startY;

canvas.addEventListener("mousedown", (event) => {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
});

canvas.addEventListener("mousemove", (event) => {
    if (isDragging) {
        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;

        offsetX += map(
            canvas.width / 2 - deltaX,
            0,
            canvas.width,
            -2 * zoom,
            2 * zoom
        );
        offsetY += map(
            canvas.height / 2 - deltaY,
            0,
            canvas.height,
            -2 * zoom,
            2 * zoom
        );
        renderMandelbrotSet();
    }
});

canvas.addEventListener("mouseup", () => {
    isDragging = false;
});

const iterationTextInput = document.getElementById("iterationText");
const iterationRangeInput = document.getElementById("iterationRange");

iterationRangeInput.value = maxIterations;
iterationTextInput.value = maxIterations;

iterationRangeInput.addEventListener("input", (event) => {
    maxIterations = event.target.value;
    iterationTextInput.value = maxIterations;

    renderMandelbrotSet();
});

iterationTextInput.addEventListener("input", (event) => {
    maxIterations = event.target.value;
    iterationRangeInput.value = maxIterations;

    renderMandelbrotSet();
});

// Call renderMandelbrot to start rendering
renderMandelbrotSet();
