# escape-the-bacon
Escape the Bacon

Introduction:

These projects on my public Github are serving as an insight into how I work, what I am learning, and may be riddled with errors, or misinformation. I'm completely fine with that because like all things in the development world, it's a constant learning process and forever-changing.

I had the main goal of using ES6 for the project over the ES5 version I was used to to push myself further in the ever-lasting journey of improving in Javascript. I also wanted to use some tools that were created to help a front-end workflow, so decided on trying out Babel, Webpack for uses I will cover over the course of the project.

Let's go!

First things first. I had to create this repo, clone it using the commandline and set up the index html page which will act the the root to the application.

Woohoo, that's done. Nice and easy. But now... already, I'm approaching something I haven't used before on a personal project - Babel! So let's quickly cover what I think it is and how it will be used.

Setting up Babel:

Because the browsers are *usually* slow at adopting new language features into their engines, we need a way for the browser to recognize the flashy new ES6 syntax we will be using so it can run. Enter Babel. Babel is a configurable transpiler, a compiler that can essentially read source code in one programming language (Javascript's ES6 for example), and compile it into a browser-recognized version on the language (Good ol' ES5). For reference here are the docs: https://babeljs.io/

I decided to use the babel-cli npm package, as I was more comfortable with the commandline - I followed the instructions on the site, as well as cross-referencing their documentation with others blog posts to see if people had opinions around setting it up. I feel this helps forming a well-rounded opinion instead of taking a 'read-one-thing-and-do-it' approach. It seems to give me a deeper understanding about the tools I'm using which is great.

So after a bit of config, my package.json included these relevant lines which I'll explain:

"devDependencies": {
  "babel-cli": "^6.18.0",
  "babel-preset-es2015": "^6.18.0"
}

The package is automagically placed under the 'devDependencies' heading if you attach --save-dev on the installation command. This means that these dependencies are needed to build the project, but not run it in production. And since we compile everything before we deploy it onto a production server, this makes total sense.

"scripts": {
  "build": "babel src --watch --out-dir lib"
}

This build command, which is run through 'npm run build' allows the corresponding task to run when needed. So what do I have as the task? A reasonably straight-forward: Run babel on the 'src' directory, watch for any changes to the directory (and sub-files) and output the compiled code into another directory called 'lib' for use in the applciation. Nice!

"babel": {
  "presets": [
    "es2015"
  ]
}

This setting tells the babel compiler that we will be compiling es2015 (ES6).

So that's it for babel! now we can utilise some great ES6 features in the code.

Setting up Webpack 2:

Now, I have my ES6 working - let's get straight into it on the browser right?.... Nope. Not quite. I'm aiming to keep my code as modular and reusable as possible, so I'll setup a module bundler so I can de-couple parts of the program to try just that.

Webpack takes modules (JS, CSS, Image Assets etc) and bundles them into a single outputted file. The benefits of this include a low initial load time, instead of requesting multiple files and assets from ther server as single requests, utilise webpack to make a singular request which has everything you need included! Sounds great right!?

I installed webpack (globally & locally under the dev environment) and created a webpack.config.js file, which is where you can fully customize it to fit your needs. for reference: http://webpack.github.io/docs/what-is-webpack.html

Onto the code!

Off the bat I had something new to learn which is great! The difference between 'const' and 'let' in the context of ES6.. Usually I would just throw a var in there and that would be fine. BUT with ES6, comes the new way to declare variables which is great for scoping within your project. I'll quickly cover how I interpreted the two, and why not use 'var' like I had always.

var:

Variables defined this way can be redefined and updated. Great in some situations, not so great in others. Let's briefly look at 'why'. Because these can be redefined, it may cause side-effects throughtout your program from using the same naming convention in another file, or if someone unfamiliar with your codebase starts on a new feature and chooses the same variable name. It happens, there's only so many ways you can name certain objects.. But browser won't scream and shout at you that it's broken so you may be trying to hunt down a bug caused by this pretty easily.. These 'vars' are function scoped - meaning they are only available to the function which initialises them, unless they are created outside of a function - which would make them global to the window/program. Not ideal in most cases.

let:

Is block scoped, meaning that it's state is only available within it's block (this could be a function, an 'if' statement or anything with curly braces). But with this, it means that they cannot be redefined while in the same scope. Of course var would let you do this, but again..Bug city! Can 'let' be updated you may ask!? Yes of course, in a similar way to var being re-assigned ( { var cat = 'meow'}; .... cat = 'woof';)


const:

Is the more robust version of the above - It cannot be mutated directly (making it a semi-immutable object) as a WHOLE. Meaning, I can change it's properties values (if it is an object), but I can never delete the whole property itself. If you need to lock down the values on the object you could always use Object.freeze() - which means the properties aren't mutatable either. const should be used for variables that will never change, such as keys etc.


SETUP:

Once I had setup the initial gameboard and gameplay variables - I could then create the framework for how the game operated. This includes the setup - creating the sprite assets, laying out the functions which will be used for gameplay, and the helper functions to implement collision logic.