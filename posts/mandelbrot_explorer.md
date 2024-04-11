---
title: "52 Projects Week 2: Mandelbrot Explorer"
date: "04-11-2024"
---

Last week, I built the sudoku solver algorithm after wrestling with procrastination and fear of failing. I was so excited to have finished it and for it to work so well, that I felt very confident going into this next project and wanted to try something that has fascinated me since I learned about it - a program that allows you to explore the [Mandelbrot Set](https://en.wikipedia.org/wiki/Mandelbrot_set).

The mandelbrot set is named after the man who discovered it, Benoit Mandelbrot. He was a mathematician and was working at IBM in the 1970's when he used a computer and printer to view the first graphical representation of the fractal set he created. It first came out as a very vague sheet of X's printed where a point on the page would be inside of his complex plane, and looked like this:

![First Image of the Mandelbrot Set](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Mandel.png/322px-Mandel.png)

It doesn't look like anything special, but as computers got faster and our ability to represent it graphically became more precise - computer scientists were able to see recursive patterns that go on and on and is infinitely complex. You can go deeper and deeper into the set, zoom further and further in and the shapes and patterns will repeat and give way to entirely new complex and infinite patterns. There are a lot of YouTube videos of people who are far more familiar with the topic than me who can explain how it is graphed if you are curious. There are also some that have taken this project to much deeper depths than I have the knowledge or time for. I am particularly fond of [this one](https://youtu.be/LhOSM6uCWxk?si=_PqdWXgbYnaCggKL), due to the number of iterations that they were able to achieve, along with the color pallette they chose to show different iteration groups.

## Background

I am no mathematician, and I am certainly no expert in fractals. I was only briefly acquainted with the Mandelbrot Set before I embarked on this project. I knew that one day I wanted to learn more about it, and to create a program to explore it like I had seen other's do. So I started by researching the principles behind the Mandelbrot Set to learn how I can determine what is in, and what is not in the set.

Also, I haven't really done much with the HTML canvas before I started this project. I had drawn some simple shapes, but never have I done something that renders pixels piece by piece. I debated on whether or not this project would even be usable in the browser, how performant the solution I had in mind was, or if I could even get it to work at all. I eventually decided to go the canvas route instead of something like C++ and SFML because I want to be able to easily access and congregate these projects as much as possible on my site. I know I wouldn't be able to easily share this if I had to create executables or just upload a video of me showing it off. Also, I had found some other programs online that were very performant and looked great, like [this one](https://mandel.gart.nz/). Spoiler alert: that one is much better than mine.

## Determining the Scope of the Set

For this blog, I'm going to keep the descriptions of the set relative to the project, and not go into the theory any more than is necessary. The HTML canvas in this project represents something called the complex plane. The X axis represents real numbers, going from -2 to 2 from right to left. The Y Axis represents imaginary numbers, going from -2i to 2i from bottom to top.

The pixels on the canvas each represent an x value and a y value. To determine if a pixel (starting from the top left, working right and down) is in the set, we first need to convert the pixel's location on the canvas to the location on the complex plane. For example, the first pixel in the top left is at (0, 0) on the canvas, but is at (-2, 2i) on the complex plane. So we pass it through a function called `map` that will convert it:

```javascript
// Function to convert canvas coordinates to complex plane coordinates
const map = (value, start1, stop1, start2, stop2) => {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
};
```

To start, we call the function like this for the x and y values of our pixels:

```javascript
const pixelX = map(x, 0, canvas.width, -2, 2); // -2 at x=0
const pixelY = map(y, 0, canvas.height, -2, 2); // -2 at y=0
```

Notice that this will mean that going up on the Y axis is actually going to negative values instead of positive like on a normal two dimensional Cartesian plane. This is a just a byproduct of moving through the canvas backwards vertically relative to the Cartesian plane.

So, with our coordinate values, we can calculate whether or not our pixel is in the set. Before we can calculate this, we need to set a maximum number of iterations that we're going to run on each pixel. This number is very important to the detail of our end result, but we'll get to that later. For now, we're going to set `maxIterations` to 100. After that's defined, we call `isInMandelbrotSet` with our pixelX and pixelY values:

```javascript
const isInMandelbrotSet = (pixelX, pixelY) => {
    let x = 0;
    let y = 0;
    let iteration = 0;

    while (x * x + y * y <= 4 && iteration < maxIterations) {
        let xTemp = x * x - y * y + pixelX;
        y = 2 * x * y + pixelY;
        x = xTemp;
        iteration++;
    }
    return iteration;
};
```

You can see above that the equations for determining if a point (x, y) is in the Mandelbrot set are x{n} = x{n-1}^2 - y{n-1}^2 + x and y{n} = 2(x{n-1})(y{n-1}) + y. We test this for some number of iterations, in our case it's the value of `maxIterations`. x^2 + y^2 gets to be 4 or higher, we know that the value is no longer bounded and will quickly shoot off towards infinity. If we get to our maximum number of iterations, as far as we can tell the value is in the Mandelbrot set. A higher number of iterations will give us more accuracy, and thus a more detailed image. My explorer includes a couple of inputs that allow you to change the maximum number of iterations.

We test this for every pixel on the canvas. You might notice that instead of returning a boolean, `isInMandelbrotSet` returns the number of iterations that were run before we either became unbounded or reached the maximum number of iterations. This is done so that we can assign a color value to the corresponding pixel. In my case I used this formula:

```javascript
const lightness = iterationCount === maxIterations ? 0 : 50;
const hue = 360 * (iterationCount / maxIterations);

ctx.fillStyle = `hsl(${hue}, 100%, ${lightness}%)`;
```

This makes it so that values that are in the set are black, and those outside of the set are a gradient of colors. Somewhat to show how stable they are, but mostly for the pretty colors on the fractal patterns.

## Issues

There's a glaring problem here, and that's the use of the escape time algorithm on every single pixel. At first, I was using an 800 by 800 canvas, and running hundreds or even a thousand iterations on many of the pixels. That quickly gets into the millions of calculations needed before the image is complete. That's not really user friendly or efficient, so I halfed the width and the height, which cuts the number of pixels we're calculating by 4 times - a big improvement by itself.

I also threw in some drag and zoom logic so that there's a little bit more interactivity. I ran into lots of hurdles trying to implement those effectively, but eventually I settled on just having a zoom, offsetX, and offsetY variable to keep track of what bounds the render should be tracking. Zooming in far enough will eventually show you a bunch of noise and impreciseness where the value becomes so small it can no longer be tracked. I don't know if it's worth trying to extend this, since you can already zoom in quite a bit.

## Conclusion

That's pretty much it! In the future, if I come back to this project it will be to implement more performance and functionality for the user. I've seen several other programs online that allow you to pan around the set and zoom without requiring a re-render for each input which leads to a much better experience. Overall, this project was fun, taught me a lot, and I got to play around with the HTML canvas. I think in the future it will be cool to try to squeeze more out of it than just drawing rectangles.
