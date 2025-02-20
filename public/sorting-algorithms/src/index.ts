const resultCanvas = document.getElementById("visualizer") as HTMLCanvasElement;
const resultContext = resultCanvas.getContext("2d");
const resetButton = document.getElementById("reset") as HTMLButtonElement;
const collectDataBtn = document.getElementById(
    "generateRandoms",
) as HTMLButtonElement;
const algorithmsWrapper = document.querySelector(
    ".algorithms .algorithms",
) as HTMLDivElement;

const maxValueCount = resultCanvas.getBoundingClientRect().width / 2;

let values: number[] = [];

function renderOutputCanvas() {
    resultContext?.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
    values.forEach((value, index) => {
        // startX, startY, end X, endY
        resultContext?.fillRect(index * 2 - 2, 300 - value, 2, value);
    });
}

function generateRandomValues() {
    for (let i = 0; i < maxValueCount; i++) {
        values[i] = Math.random() * 300 + 1;
    }
}

function collectData() {
    generateRandomValues();
    renderOutputCanvas();
    collectDataBtn.disabled = true;
    algorithmsWrapper.style.display = "block";
}

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function resetProgram() {
    resetButton.disabled = true;
    values = [];
    renderOutputCanvas();
    collectDataBtn.disabled = false;
    algorithmsWrapper.style.display = "none !important";
}

resetButton?.addEventListener("click", () => resetProgram());

async function bubbleSort() {
    let swapped = null;
    for (let i = 0; i < values.length - 1; i++) {
        swapped = false;
        for (let j = 0; j < values.length - 1; j++) {
            if (values[j] > values[j + 1]) {
                // make arr[j + 1] arr[j]
                let temp = values[j + 1];
                values[j + 1] = values[j];
                values[j] = temp;
                swapped = true;
                renderOutputCanvas();
                await delay(4);
            }
        }

        if (!swapped) break;
    }
    resetButton.disabled = false;
}

async function merge(left: number, mid: number, right: number) {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    // Create temp arrays
    const L = new Array(n1);
    const R = new Array(n2);

    // Copy data to temp arrays L[] and R[]
    for (let i = 0; i < n1; i++) L[i] = values[left + i];
    for (let j = 0; j < n2; j++) R[j] = values[mid + 1 + j];

    let i = 0,
        j = 0;
    let k = left;

    // Merge the temp arrays back into arr[left..right]
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            values[k] = L[i];
            i++;
        } else {
            values[k] = R[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements of L[], if there are any
    while (i < n1) {
        values[k] = L[i];
        i++;
        k++;
    }

    // Copy the remaining elements of R[], if there are any
    while (j < n2) {
        values[k] = R[j];
        j++;
        k++;
    }
}

async function mergeSort(left: number, right: number) {
    if (left >= right) return;

    const mid = Math.floor(left + (right - left) / 2);
    await mergeSort(left, mid);
    await mergeSort(mid + 1, right);
    merge(left, mid, right);
    renderOutputCanvas();
    await delay(1);

    resetButton.disabled = false;
}

collectDataBtn?.addEventListener("click", collectData);

// Buttons and listeners
document
    .getElementById("bubble")
    ?.addEventListener("click", () => bubbleSort());

document
    .getElementById("merge")
    ?.addEventListener("click", () => mergeSort(0, values.length - 1));
