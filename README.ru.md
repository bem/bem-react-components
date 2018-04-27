# BEM React Components

`bem-react-components` — это библиотека визуальных компонентов построенных с помощью [bem-react-core].
React компоненты это блоки с точки зрения BEM методологии. Прочитать подробнее можно на [bem-info].

:construction: Hard Work is in Progress :construction:

## Блоки

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

## Сборка

Сейчас `bem-react-components` сильно зависят от сборки.
Можно использовать несколько готовых решений:

* [webpack-bem-loader]
* [babel-plugin-bem-import]


Для быстрого старта используйте [create-bem-react-app].

### Webpack

Пример конфига `webpack.conf.js`

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

Больше опций `bem-loader` можно посмотреть в [документации](https://github.com/bem/webpack-bem-loader#options).

### Babel

NB: Babel не обрабатывает `css` файлы, только `js` и `js-like`.

Пример конфига `.babelrc`

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

Больше опций `bem-import` можно посмотреть в [документации](https://github.com/bem/babel-plugin-bem-import#options).

## Команда основной разработки

* [veged](https://github.com/veged)
* [awinogradov](https://github.com/awinogradov)
* [Yeti-or](https://github.com/Yeti-or)

## Лицензия

Code and documentation © 2017 YANDEX LLC. Code released under the [Mozilla Public License 2.0](LICENSE.txt).

[bem-react-core]: https://github.com/bem/bem-react-core
[bem-info]: https://bem.info
[webpack-bem-loader]: https://github.com/bem/webpack-bem-loader
[babel-plugin-bem-import]: https://github.com/bem/babel-plugin-bem-import
[create-bem-react-app]: https://github.com/bem/create-bem-react-app
