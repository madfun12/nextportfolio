const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let maxIterations = 100;

let zoom = 1;
let offsetX = 0;
let offsetY = 0;

// Auto-scale the iteration budget with zoom depth. `maxIterations` (set via the
// slider) acts as the base floor; each octave (2x) of zoom-in adds a modest
// number of iterations so fine boundary detail keeps resolving instead of
// turning to noise. Kept gentle (and capped low) on purpose: since hue is
// normalized by the iteration count, a smaller budget keeps the color spectrum
// spread out for good contrast. Capped so deep zooms don't freeze the renderer.
const ITER_PER_ZOOM_LEVEL = 20;
const MAX_ITER_CAP = 1000;

const getMaxIterations = () => {
    const zoomDepth = Math.max(0, Math.log2(1 / zoom)); // octaves zoomed in (0 at start)
    return Math.min(
        MAX_ITER_CAP,
        Math.round(maxIterations + zoomDepth * ITER_PER_ZOOM_LEVEL)
    );
};

const renderHSL = (iterationCount, iterations) => {
    const lightness = iterationCount === iterations ? 0 : 50;
    const hue = 360 * (iterationCount / iterations);
    return `hsl(${hue}, 100%, ${lightness}%)` 
}

const renderGrayScale = (iterationCount, iterations) => {
    const value = 255 - iterationCount / iterations * 255;
    return `rgb(${value}, ${value}, ${value})`
}

const renderMandelbrotSet = () => {
    const width = canvas.width;
    const height = canvas.height;
    const iterations = getMaxIterations();

    const img = ctx.createImageData(width, height);
    const data = img.data; // Uint8ClampedArray, 4 bytes (RGBA) per pixel

    for (let y = 0; y < height; y++) {        // y outer = cache-friendly
        for (let x = 0; x < width; x++) {
            const pixelX = map(x, 0, width, offsetX - 2 * zoom, offsetX + 2 * zoom);
            const pixelY = map(y, 0, height, offsetY - 2 * zoom, offsetY + 2 * zoom) * -1;
            const iterationCount = isInMandelbrotSet(pixelX, pixelY, iterations);

            const value = 255 - (iterationCount / iterations) * 255;
            const i = (y * width + x) * 4;
            data[i] = value;      // R
            data[i + 1] = value;  // G
            data[i + 2] = value;  // B
            data[i + 3] = 255;    // A
        }
    }
    ctx.putImageData(img, 0, 0);
};


const isInMandelbrotSet = (pixelX, pixelY, iterations) => {
    let x = 0;
    let y = 0;
    let iteration = 0;

    // Check if we're unbounded or if we're at the iteration cap
    while (x * x + y * y <= 4 && iteration < iterations) {
        let xTemp = x * x - y * y + pixelX;
        y = 2 * x * y + pixelY;
        x = xTemp;
        iteration++;
    }
    return iteration;
};

// Function to convert canvas coordinates to complex plane coordinates
const map = (value, start1, stop1, start2, stop2) => {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
};

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
        startX = event.clientX;
        startY = event.clientY;
        renderMandelbrotSet();
    }
});

canvas.addEventListener("mouseup", () => {
    isDragging = false;
});

// Call renderMandelbrot to start rendering
renderMandelbrotSet();
