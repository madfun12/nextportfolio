"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
const resultCanvas = document.getElementById("visualizer");
const resultContext = resultCanvas.getContext("2d");
const resetButton = document.getElementById("reset");
const collectDataBtn = document.getElementById("generateRandoms");
const algorithmsWrapper = document.querySelector(".algorithms .algorithms");
const maxValueCount = resultCanvas.getBoundingClientRect().width / 2;
let values = [];
function renderOutputCanvas() {
    resultContext === null || resultContext === void 0 ? void 0 : resultContext.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
    values.forEach((value, index) => {
        // startX, startY, end X, endY
        resultContext === null || resultContext === void 0 ? void 0 : resultContext.fillRect(index * 2 - 2, 300 - value, 2, value);
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
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function resetProgram() {
    resetButton.disabled = true;
    values = [];
    renderOutputCanvas();
    collectDataBtn.disabled = false;
    algorithmsWrapper.style.display = "none !important";
}
resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener("click", () => resetProgram());
function bubbleSort() {
    return __awaiter(this, void 0, void 0, function* () {
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
                    yield delay(4);
                }
            }
            if (!swapped)
                break;
        }
        resetButton.disabled = false;
    });
}
function merge(left, mid, right) {
    return __awaiter(this, void 0, void 0, function* () {
        const n1 = mid - left + 1;
        const n2 = right - mid;
        // Create temp arrays
        const L = new Array(n1);
        const R = new Array(n2);
        // Copy data to temp arrays L[] and R[]
        for (let i = 0; i < n1; i++)
            L[i] = values[left + i];
        for (let j = 0; j < n2; j++)
            R[j] = values[mid + 1 + j];
        let i = 0, j = 0;
        let k = left;
        // Merge the temp arrays back into arr[left..right]
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                values[k] = L[i];
                i++;
            }
            else {
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
    });
}
function mergeSort(left, right) {
    return __awaiter(this, void 0, void 0, function* () {
        if (left >= right)
            return;
        const mid = Math.floor(left + (right - left) / 2);
        yield mergeSort(left, mid);
        yield mergeSort(mid + 1, right);
        merge(left, mid, right);
        renderOutputCanvas();
        yield delay(1);
        resetButton.disabled = false;
    });
}
collectDataBtn === null || collectDataBtn === void 0 ? void 0 : collectDataBtn.addEventListener("click", collectData);
// Buttons and listeners
(_a = document
    .getElementById("bubble")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => bubbleSort());
(_b = document
    .getElementById("merge")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => mergeSort(0, values.length - 1));
