---
title: 'Sass/CSS Module Setup in NEXTjs'
date: 'October 30, 2022'
---

When I started learning Next, I learned that they have built in support for Sass/CSS modules. They took a second for me to figure out how to use, so I thought I would put together some steps that are easy to follow. I use create-next-app and place all of my files in a 'styles' folder. This process is pretty simple, so let's get started:

1. Install Node

If you haven't already installed Node, you're going to need it. Go over to nodejs.org and download the installer off of their home page.

2. Create a Next app

This step is obvious, but if you haven't done this already, open a terminal or command prompt window and go to the folder you want to create your app in. Type in
\
\
 `npx create-next-app my-app`
 \
 \
and if you're using Sass, move to your project directory and install Sass in the terminal or command prompt using
\
\
`npm install --save-dev sass`
\
\
to create an app folder with the base files already created. In the project directory, there should already be a folder called '/styles' and contains 'globals.css' and 'Home.module.css'.
\
\
'globals.css' is a stylesheet that is accessible by the entire program. You can use regular react className='your-style' to change the appearance of any element in any component. Modules work a bit differently, and I'll go over that in the next step.

3. Create a module for your component

In your styles folder, create your .css or .scss stylesheet. Using the 'component.module.scss' naming convention is required by Next. If you were going to have a profile card component for example, you might name it 'profileCard.module.scss'. This works like any other stylesheet inside of the file. The way we access the styles works differently, though.

4. Import your style sheet in your component

In your component.js file, import your module file like so:
\
\
`import styles from ../styles/component.module.scss`
\
\
You'll need to update this to actually point to you module file name and location. To use the styles, instead of 
\
\
`className='component-style'`
\
\
 you'll need to access the styles as an object that we imported above. So instead, we'll be accessing the styles like you would access any other item in a JS object: 
 \
 \
 `className={styles.componentStyle}`
 \
 \
  This means that in the stylesheet, we'll need to be using camel case to name our styles. Not the prettiest or most versatile, but necessary nonetheless. 
\
\
And that's basically it. Next has out-of-the-box module support, so the setup isn't daunting. It is a bit of change to use the style references like an object. There has been many a time where I've used emmett abbreviation and not understood why my styles weren't applying. Make sure you're accessing the styles object!





