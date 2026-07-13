const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");
const collectDataBtn = document.getElementById("generateRandoms");
const bubbleSortBtn = document.getElementById('bubble');
const mergeSortBtn = document.getElementById('merge');
const maxValueCount = canvas.width;
let values = [];

function delay(ms){
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms);
    })
}

function generateRandomValues() {
    for(let i = 0; i < maxValueCount; i++){
        values.push( Math.random());
    }
}



async function renderValues(ms){
    await delay(ms).then(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for(let i = 0; i < canvas.width; i++){
            ctx.fillStyle = `hsl(${values[i] * 360}, 100%, 50%)`;
            ctx.fillRect(i, 0, 1, values[i] * canvas.height);
        }
    })
}
async function bubbleSort() {
    let swapped = null;
    for(i = 0; i < values.length; i++){
        for(j = 0; j < values.length; j++){
            if(values[j] > values[j + 1]){
                swapped = values[j + 1];
                values[j + 1] = values[j]
                values[j] = swapped;
                swapped = null;
            }
            await renderValues(1);
        }
    }
}

async function merge(arr, left, mid, right) {
    const leftCount = mid - left + 1; // 0..149
    const rightCount = right - mid;    // 150..300

    const lArr = new Array(leftCount);
    const rArr = new Array(rightCount);

    // copy content from array to left and right
    for(let l = 0; l < leftCount; l++){
        lArr[l] = arr[left + l];
        renderValues(1);
    }
    for(let r = 0; r < rightCount; r++){
        rArr[r] = arr[mid + 1 + r];
        renderValues(1);
    }

    let i = 0, j = 0;
    let k = left;

    // Merge the temp arrays back into arr[left..right].
    // Each write reorders the (global) array, so redraw after each one.
    while(i < leftCount && j < rightCount){
        if(lArr[i] <= rArr[j]){
            arr[k] = lArr[i];
            i++;
        } else {
            arr[k] = rArr[j];
            j++;
        }
        k++;
        await renderValues(1)
    }

    // Copy the remaining elements of L[], if there are any
    while (i < leftCount) {
        arr[k] = lArr[i];
        i++;
        k++;
        await renderValues(1);
    }

    // Copy the remaining elements of R[], if there are any
    while (j < rightCount) {
        arr[k] = rArr[j];
        j++;
        k++;
        await renderValues(1);
    }
}

async function mergeSort(arr, left, right) {
    if (left >= right)
        return;

    const mid = Math.floor(left + (right - left) / 2);
    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);
    await merge(arr, left, mid, right);
}





async function initialRender(){
    generateRandomValues();
    renderValues()
}


collectDataBtn.addEventListener('click', () => {
    values = [];
    initialRender();
    bubbleSortBtn.disabled = false;
    mergeSortBtn.disabled = false;
})

bubbleSortBtn.addEventListener("click", () => {
    mergeSortBtn.disabled = true;
    bubbleSortBtn.disabled = true;
    bubbleSort();
})

mergeSortBtn.addEventListener("click", async () => {
    mergeSortBtn.disabled = true;
    bubbleSortBtn.disabled = true;
    await mergeSort(values, 0, values.length - 1);
})



