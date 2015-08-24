react-titanium
==============

<img
  align="right" width="128" height="128"
  src="https://raw.githubusercontent.com/yuchi/react-titanium/master/logo.png">

A React custom renderer for [Appcelerator®][appc] [Titanium™ SDK][tisdk].

[appc]: https://www.appcelerator.com/
[tisdk]: http://www.appcelerator.org/#titanium

This renderer should currently be considered as experimental and subject to
change since it works on a beta version of React (`0.14.0-beta3`).

Installation
------------

```bash
$ cd Titanium_Workspace/MyApp

# Initialize a node package here
$ npm init

# Let you use transformers (such as Babel) and npm packages
$ npm install --save-dev titaniumifier
$ node_modules/.bin/install-titaniumifier-plugin
$ node_modules/.bin/install-titaniumifier-plugin --no-simulate

# React-titanium requires v0.14
$ npm install --save react@0.14.0-beta3 react-titanium
# Let’s write in ES2015!
$ npm install --save-dev babelify babel-runtime
```

Edit your *package.json* file so it looks like this:

```js
{
  // This is the starting point of our app
  "main": "Resources/app.js",

  // Hook Babel transformation into Titaniumifier
  "titaniumifier": {
    "transforms": {
      "babelify": {
        "stage": 0,
        "optional": [ "runtime" ],
        "plugins": [ "react-titanium/lib/babel-plugin:before" ]
      }
    }
  }
}
```

Test your installation:

```bash
$ [appc] ti build --platform ios
```

Example
-------

```js
import React, { Component } from 'react';
import { render } from 'react-titanium';

class App extends Component {
  state = { counter: 0 };

  increment = () => this.setState({
    counter: this.state.counter + 1
  });

  open = window => {
    if (this.opened || !window) return;

    this.opened = true;
    window.open();
  }

  render() {
    return (
      <window
        onClick={ this.increment }
        ref={ this.open }
      >
        <label color="#09f" text={ this.state.counter } />
      </window>
    );
  }
}

render(<App />);
```

Building and Development
------------------------

### Setup

```bash
$ git clone git@github.com:yuchi/react-titanium.git
$ cd react-titanium
$ npm install
```

### Compiling (ES2015 to ES5)

```bash
$ npm run compile
```

### Testing (temporary solution)

```bash
$ cd Titanium_Workspace
$ titanium create # Follow the instructions to create an app
$ cd MyApp
$ npm init
$ npm install --save-dev titaniumifier
$ node_modules/.bin/install-titaniumifier-plugin
$ node_modules/.bin/install-titaniumifier-plugin --no-simulate
$ npm install --save-dev babelify babel-runtime # Edit the package.json!!
$ npm install --save react@0.14.0-beta3
$ ln -s /path/to/my/react-titanium node_modules/react-titanium
# Then compile and...
$ titanium build --platform ios # ...have fun!
```

Acknowledgements
----------------

I was finally able to grok how to implement a custom renderer thanks to
[Yomguithereal][Yomguithereal]’s fantastic [`react-blessed`][react-blessed].

Go thank him with a follow or a star! :+1:

[Yomguithereal]: https://github.com/Yomguithereal
[react-blessed]: https://github.com/Yomguithereal/react-blessed

License
-------

MIT
