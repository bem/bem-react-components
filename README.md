# BEM React Components

`bem-react-components` is an library that provides a set of visual components build with [bem-react-core].
React Components are called blocks according to BEM methodology. Check [bem-info] for deeper dive.

:construction: Hard Work is in Progress :construction:

## Blocks

* [Attach](common.blocks/Attach/)
* [Button](common.blocks/Button)
* [CheckBox](common.blocks/CheckBox)
* [CheckBoxGroup](common.blocks/CheckBoxGroup)
* [Dropdown](common.blocks/Dropdown)
* [Icon](common.blocks/Icon)
* [Image](common.blocks/Image)
* [KeyCodes](common.blocks/KeyCodes)
* [Link](common.blocks/Link)
* [Menu](common.blocks/Menu)
* [Modal](common.blocks/Modal)
* [Popup](common.blocks/Popup)
* [ProgressBar](common.blocks/ProgressBar)
* [Radio](common.blocks/Radio)
* [RadioGroup](common.blocks/RadioGroup)
* [Select](common.blocks/Select)
* [Spin](common.blocks/Spin)
* [TextArea](common.blocks/TextArea)
* [TextInput](common.blocks/TextInput)

## Build

Right now `bem-react-components` is heavily relying on assemble, so it's necessary to use one.
There are several implementations:

* [webpack-bem-loader]
* [babel-plugin-bem-import]


For fast start you could use [create-bem-react-app].

### Webpack

Example of `webpack.conf.js`

```js
module: {
  rules: [
    {
      test: /\.(js)$/,
      include: ['./node_modules/bem-react-components', './src'],
      use: [
        {
          loader: 'webpack-bem-loader',
          options: {
            levels: [
              './node_modules/bem-react-components/common.blocks',
              './src/my-awesome-blocks'
            ],
            techs: ['js', 'css']
          }
        },
        {
          loader: 'babel-loader',
          options: { ... }
        }
      ]
    }
  ]
}
```

To use more options of `bem-loader` check [docs].

### Babel

NB: Babel couldn't build css files, only js and js-like.

Example of `.babelrc`

```json
{
  "presets": [["es2015", { "loose":true }], "react"],
  "plugins": [
    ["bem-import", {
      "levels": [
        "./node_modules/bem-react-components/common.blocks",
        "./src/my-awesome-blocks"
      ]
    }]
  ]
}
```

To use more options of `bem-import` check [docs](https://github.com/bem/babel-plugin-bem-import#options).

## Maintainers

* [veged](https://github.com/veged)
* [awinogradov](https://github.com/awinogradov)
* [Yeti-or](https://github.com/Yeti-or)

## License

Code and documentation © 2017 YANDEX LLC. Code released under the [Mozilla Public License 2.0](LICENSE.txt).

[bem-react-core]: https://github.com/bem/bem-react-core
[bem-info]: https://bem.info
[webpack-bem-loader]: https://github.com/bem/webpack-bem-loader
[docs]: https://github.com/bem/webpack-bem-loader#options
[babel-plugin-bem-import]: https://github.com/bem/babel-plugin-bem-import
[create-bem-react-app]: https://github.com/bem/create-bem-react-app
