> :warning: ***Maintainer wanted!*** [Create an issue](https://github.com/yuchi/react-titanium/issues/new) if you want to maintain it!

react-titanium
==============

<img
  align="right" width="128" height="128"
  src="https://raw.githubusercontent.com/yuchi/react-titanium/master/logo.png">

[![Dependencies](https://david-dm.org/yuchi/react-titanium/status.svg?style=flat-square)](https://david-dm.org/yuchi/react-titanium#info=dependencies)
[![Dev Dependencies](https://david-dm.org/yuchi/react-titanium/dev-status.svg?style=flat-square)](https://david-dm.org/yuchi/react-titanium#info=devDependencies)
[![Peer Dependencies](https://david-dm.org/yuchi/react-titanium/peer-status.svg?style=flat-square)](https://david-dm.org/yuchi/react-titanium#info=devDependencies)

A React custom renderer for [Appcelerator®][appc] [Titanium™ SDK][tisdk].

[appc]: https://www.appcelerator.com/
[tisdk]: http://www.appcelerator.org/#titanium

This renderer should currently be considered as experimental and subject to
change since it works on a beta version of React (`0.14.0-beta3`).

[Installation][inst]
--------------------

There’s a [step-by-step guide][inst] on the website.

The gist of it is that once you have a titaniumified app you install it through

    npm install --save react@0.14.0-beta3
    npm install --save react-titanium

and you use it with

```js
import React from 'react';
import { render } from 'react-titanium';
```

[inst]: http://yuchi.github.io/react-titanium/docs/Installation.html

Examples
--------

There’s a simple [“Hello World” example][hello-world] that shows the minimal usage and a more complete [“Counter” example][counter] on the website.

[hello-world]: http://yuchi.github.io/react-titanium/docs/examples/hello_world/index.html
[counter]: http://yuchi.github.io/react-titanium/docs/examples/counter/index.html

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
