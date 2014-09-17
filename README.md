# es6-module-transpiler-js-brunch

Adds ES6 module syntax to [Brunch](http://brunch.io) based on Square's [es6-module-transpiler](https://github.com/square/es6-module-transpiler).

The **ES6 Module Transpiler** is an experimental compiler that allows you to write your JavaScript using a subset of the current ES6 module syntax, and compile it into AMD or CommonJS modules.

**Note:** This plugin differs from the [es6-module-transpiler-brunch plugin by Giovanni Collazo](https://github.com/gcollazo/es6-module-transpiler-brunch) as it does not use coffeescript, and provides enhanced configuration options for mapping module names and specifying the module wrapper type.

**Warning: In my limited testing the ES6 module transpiler currently doesn't emit anything useful for typical CommonJS interoperability, so this plugin is effectively only useful for AMD.**

## Motivation
I am currently using this plugin to provide ember-cli equivalent ES6 module transpiling using brunch instead of ember-cli/broccoli because of performance regressions currently (14 Sep 2014) render it unusable.  This required the ability to specify an 'amd' wrapper type so it can use 'ember-loader', and 'moduleName' mapping so modules can be name-spaced as per ember-cli conventions.


## Installation
Install the plugin via npm with `npm install --save es6-module-transpiler-js-brunch`.

Or, do manual install:

* Add `"es6-module-transpiler-js-brunch": "x.y.z"` to `package.json` of your brunch app.
* If you want to use git version of plugin, add
`"es6-module-transpiler-brunch": "git+ssh://git@github.com:ahacking/es6-module-transpiler-js-brunch.git"`.

## How the plugin works
The plugin will take all files ending in `*.js` under the `app` directory and pass them through the `es6-module-transpiler` and compiled to a module based on your configured wrapper, (AMD by default)

## Configuration
The plugin has the following configuration options you can add to your project's `config.coffee`:
* `match` is a regex used to decide what files to transpile,
* `wrapper` specifies the module wrapper, eg 'amd' (default) or cjs' supported.
* `moduleName` a function that can be used to map module names as required.
* `options` options to pass through verbatim to `es6-module-transpiler`.

**It is important to disable the brunch module wrapper as it interferes with the module wrapping performed by this plugin.**

```javascript
exports.config = 
  modules:
    wrapper: false
  plugins:
    es6ModuleTranspiler:
      match: /^app/
      wrapper: 'amd'
      debug: yes
      moduleName: (path)-> 'namespace/' + path
      options:
        imports:
          underscore: '_'
        global: 'RSVP'
```
