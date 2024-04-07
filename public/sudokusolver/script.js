let grid;
let dontTouch = [[], [], [], [], [], [], [], [], []];

const getInputs = (inputs) => {
    let arr = [[], [], [], [], [], [], [], [], []];
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (inputs[row * 9 + col].value) {
                arr[row][col] = parseInt(inputs[row * 9 + col].value);
                dontTouch[row][col] = true;
            } else {
                arr[row][col] = null;
                dontTouch[row][col] = false;
            }
        }
    }
    return arr;
};

const updateInput = (row, col, value) => {
    inputs[row * 9 + col].value = value;
};

const checkSubGrid = (row, col, value) => {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
            if (grid[r][c] === value) {
                return false;
            }
        }
    }

    return true;
};

const checkColumn = (col, value) => {
    for (let r = 0; r < 9; r++) {
        if (grid[r][col] === value) {
            return false;
        }
    }
    return true;
};

const checkRow = (row, value) => {
    return !grid[row].includes(value);
};

const clearAfter = (row, col) => {
    if (col === 8) {
        row++;
        col = 0;
    } else {
        col++;
    }
    for (let r = row; r < 9; r++) {
        for (let c = col; c < 9; c++) {
            if (!dontTouch[r][c]) {
                grid[r][c] = null;
            }
        }
    }
};

const getValue = (row, col, initValue) => {
    let validValue;
    for (let value = initValue; value < 10; value++) {
        if (
            checkRow(row, value) &&
            checkColumn(col, value) &&
            checkSubGrid(row, col, value)
        ) {
            validValue = value;
            break;
        }
    }
    if (!validValue) return false;

    return validValue;
};

const handleSolve = () => {
    grid = getInputs(inputs);
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] !== null || dontTouch[row][col]) {
                continue;
            } else {
                let value = getValue(row, col, 1);
                while (!value || grid[row][col] === 9 || dontTouch[row][col]) {
                    if (col === 0) {
                        row--;
                        col = 8;
                    } else {
                        col--;
                    }

                    clearAfter(row, col);
                    value = getValue(row, col, grid[row][col] + 1);
                }
                grid[row][col] = value;
                updateInput(row, col, value);
            }
        }
    }
};

const inputs = document.querySelectorAll("input");
const solveButton = document.querySelector("button");

solveButton.addEventListener("click", handleSolve);
