# Installation

This project, *react-titanium*, works with React `>=0.14`.

Because it expects you to have a node-compatible environment to work with, and Titanium™ offers only a minimal CommonJS implementation, you need to use a tool such as [Titaniumifier][Titaniumifier] in [Host-mode][host-mode].

This is indeed how we test *react-titanium*, and this documentation will also guide you in setting everything up and running.

[titaniumifier]: https://github.com/smclab/titaniumifier
[host-mode]: https://github.com/smclab/titaniumifier/wiki/Host-mode


## Setup Titanium™ SDK

> Note: if you Appcelerator® Studio or Titanium™ SDK already set up you can skip this section.

To install all the necessary tools you should read the [guide provided by Appcelerator](http://docs.appcelerator.com/platform/latest/#!/guide/Installation_and_Configuration).

**If you have any issue there’s a great [Slack community (called `ti-slack`)][ti-slack] and you can [signup here][ti-slack-signup].**

A fast overview that covers the installation of the completely OSS version of the tooling is the following:

1. Install [**Node.js**](https://nodejs.org/)

2. Install the native platform SDKs, Appcelerator has guides for [Android][Android], [iOS][iOS] and [Windows Phone][Windows Phone]

3. Install the Titanium™ CLI

       [sudo] npm install --global titanium tisdk

4. Install the latest stable Titanium™ SDK

       titanium sdk install --default

5. Setup the environment

       titanium setup


[Android]: http://docs.appcelerator.com/platform/latest/#!/guide/Installing_the_Android_SDK
[iOS]: http://docs.appcelerator.com/platform/latest/#!/guide/Installing_the_iOS_SDK
[Windows Phone]: http://docs.appcelerator.com/platform/latest/#!/guide/Installing_the_Windows_Phone_SDK

[ti-slack]: https://ti-slack.slack.com
[ti-slack-signup]: http://topener.nl/tislack/

## Create your app project

We suggest you to start with a new app project, and once accustomed to both *titaniumifier* and *react-titanium* migrate your Classic or Alloy projects.

You can use Appcelerator Studio, or if you love the terminal as we do then execute the following commands:

    $ cd ~/Titanium_Workspace/

    $ titanium create \
       --type app \
       --name RTTests \
       --platforms ios,android \
       --id com.mycompany.rttests

    $ cd RTTests/

> Note: you can skip creation options since the CLI will ask you for what it needs interactively.

**Attention:** don’t use `Titanium` inside your project name!

## Set up a package for your app

To manage your dependencies and to later define some compilation utilities you need to have a *package.json* file in the root of your application.

This can be considered as a *partial duplicate* of the information that can be found in *tiapp.xml* and in fact it is. The main difference is that __*package.json* file will manage *npm* runtime and compilation dependencies__ while __*tiapp.xml* will manage the runtime *native* runtime dependencies and native compilation configuration__.

If you are Node.js developer, or you already had to work with a *package.json* then you should already know what we’re talking about.

You can do this by executing `npm init`:

    $ cd ~/Titanium_Workspace/RTTests

    $ npm init

    name: (RTTests) rttests
    version: (1.0.0)
    description:
    entry point: (index.js) Resources/app.js
    test command:
    git repository:
    keywords:
    author:
    license: (ISC)

**Attention:** npm will then ask for a bunch of things (as shown), but the important ones are `name` (it cannot have capital letters) and `entry point` (it must be `Resources/app.js` for now.)


## Configuring Titaniumifier

As we said before you’re going to be able to use `require()` as you’d expect to do in Node.js, and for this we’re going to use Titaniumifier.

As an extra bonus you will be able to **use almost every package that you can find on npm**! Yay!

Inside you app root directory execute:

    npm install --save-dev titaniumifier

This command will download and install the *titaniumifier* package, saving it into you *package.json* inside the `devDependencies`.

Once it is installed you can run its installer by running:

    $(npm bin)/install-titaniumifier-plugin

…and add `--no-simulate` if everything is correctly in place:

    $(npm bin)/install-titaniumifier-plugin --no-simulate


## Configure ES2015 (aka ES6)

Once we have *titaniumifier* in place we can even start writing in different languages, the important bit is that they need to be able to transpile to JavaScript, more precisely to EcmaScript 5.

In this example we’ll use EcmaScript 2015 (aka ES6) with the de-facto standard compiler: Babel.

> Note: if you want to use another language (such as CoffeeScript or TypeScript) search for a **browserify transformer** for that language.

First of all we need to install the transformer:

    npm install --save-dev babelify
    npm install --save babel-runtime

Then we need to modify the *package.json* file to include the transformation directives:

    // package.json
    {
      "name": "rttests",
      "main": "Resources/app.js",
      "devDependencies": {
        "titaniumifier": "^1.5.0"
      },
      "titaniumifier": {
        "transforms": {
          "babelify": {
            "stage": 0,
            "optional": [ "runtime" ]
          }
        }
      }
    }


Let’s break it down:

- `"titaniumifier": { ... }` is where you put directives to the compilation process;
- `"transforms": { ... }` is a list of transform operations specified as `"transform": options`;
- `"stage": 0` enables cool features such as decorators and class properties ([read more](http://babeljs.io/docs/usage/experimental/));
- `"optional": [ "runtime" ]` creates more compact code (and that’s why we installed `babel-runtime` in the first place).


## Install React

React included the ability do define custom renderers on version 0.14, which at the time of writing is still in beta (`0.14.0-beta3`).

So let‘s install all the required dependencies:

    npm install --save react@0.14.0-beta3
    npm install --save react-titanium

Well, the installation is finished!

Ready to give it a spin? Then read [how to use React in your Titanium™ SDK apps](usage/README.md)!
