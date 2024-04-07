---
title: "52 Projects: Sudoku Solver"
date: "04-06-2023"
---

I recently started a goal to complete a new coding project a week. I decided that I would jump in by building something I hadn't had any real experience with - a sudoku solver program. I failed the goal of completing it in a week; it ended up taking me 2 weeks to complete. Not because I was stumped and working on it non-stop, but because I kept procrastinating.

I hadn't built an algorithm like this in a long time, and I think I was worried about running into a problem that I wouldn't know the solution to. In hindsight, that thought seems silly now that it's done, but it goes to show that in the moment you can convince yourself that you're not able to accomplish something that you actually can with a little coffee and 'thinkin' power.

As far as my sudoku background, before a couple of weeks ago I had only ever attempted a few puzzles as a kid and never completed them. The idea of the puzzle intrigued me, but I never actually made an earnest attempt or learned the very simple rules. The puzzle is a 9x9 grid that is split into 9 smaller 3x3 subgrids.

![An empty sudoku grid](/images/sudoku_grid.png)

The rules are simple. You fill the puzzle with numbers 1-9. Rows, columns, and subgrids must contain all numbers, with no repeats. So to determine if a box on the puzzle has a correct value, see if it's already used in that column, that row, or the subgrid that contains the box.

![A complete, valid sudoku puzzle](/images/valid_sudoku.png)

Sudoku puzzles are provided with a few of the boxes filled in to start. The hard part comes from going through the puzzle and then realizing that what you've been working on can't be valid, and you need to start over.

## Algorithmic Methods

I'm no sudoku expert, so I did a bit of research into sudoku solving algorithms. All that I needed was wikipedia's article discussing that exact topic: [Sudoku Solving Algorithms](https://en.wikipedia.org/wiki/Sudoku_solving_algorithms). The first algorithm they listed there was what I already had in mind. A brute force method that works it's way through the puzzle until it finds the correct solution. There are several benefits to this method that made it the obvious choice for me.

-   Brute force methods don't use complex strategy or a complicated mathematical theory.
-   A solution for every valid puzzle is guaranteed
-   The solving time is still mostly very quick

Now, there are puzzles that take a very long time to solve. The wikipedia article has an image of a puzzle that is designed to work against the backtracking method, and it took my algorithm too long to solve and brought the browser to a crawl while it worked through every possible value.

I am very intrigued by the other algorithms that people have used, particularly the stochastic method to use random numbers instead of increasing numbers. I might revisit this project in the future to try and implement something like that.

## Implementation

For this project, I wanted a simple GUI and to not have to run a server that does the computation, so I went with just a simple HTML/Vanilla JS project. The HTML is very simple. It's just 81 text inputs inside of a wrapper element and then a button that when clicked, starts the solving algorithm. There's some very simple styling to get a dark background so I can comfortably stare at the screen while I work on this.

The algorithm is broken up into several functions that all play a specific role in the solving process. The most important is the `handleSolve` function:

```javascript
const handleSolve = () => {
    // Get the contents of the inputs and place them in a 2d grid called 'grid'
    grid = getInputs(inputs);
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            // Check if there is already a value in the current
            // box or if it's an original input
            if (grid[row][col] !== null || dontTouch[row][col]) {
                continue;
            } else {
                // Attempt to get a value that is valid for the current box
                let value = getValue(row, col, 1);

                // If a value was not found, or if the current spot is 9,
                // or if this is an original input,go back a spot
                while (!value || grid[row][col] === 9 || dontTouch[row][col]) {
                    if (col === 0) {
                        row--;
                        col = 8;
                    } else {
                        col--;
                    }

                    // Delete every box the algorithm has filled after the
                    // current box
                    clearAfter(row, col);
                    value = getValue(row, col, grid[row][col] + 1);
                }

                // Once the value has been gotten, update the grid
                // and then update the value of the corresponding input
                grid[row][col] = value;
                updateInput(row, col, value);
            }
        }
    }
};
```

This function does most of the work. I added some comments for the purpose of readability. It's a pretty simple algorithm - it can most definitely be shortened and have some steps removed, I'm sure. It starts by getting a valid value for the current box. If it can't find a valid value, then it will go back a box and try again. It will keep doing that until a value is found and it can continue. The `getValue` function that gets called is also very simple:

```javascript
const getValue = (row, col, initValue) => {
    let validValue;
    // Start at initial value and work up to 9
    for (let value = initValue; value < 10; value++) {
        // If the current value is not in the row, column, or subgrid of current
        // box then it's valid
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
```

There are a few more function like `checkRow`, `checkColumn`, and `checkSubGrid` that make the whole thing work, but they're all just a few lines long and self-explanatory. Overall, there's really not much to this algorithm and looking back on it, I shouldn't have been intimidated by it at all. It ended up being a really gratifying process, I got to work on some parts of my mind that I don't get to excercise in my day to day, and now I can check any sudokus I do in the future to make sure they're correct.

Try the solver for yourself here: [Sudoku Solver](/sudokusolver/index.html)
