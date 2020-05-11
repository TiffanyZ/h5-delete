module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 37.5,
      unitPrecision: 2,
      propList: [
        'height',
        'line-height',
        'width',
        'padding',
        'padding-top',
        'padding-right',
        'padding-bottom',
        'padding-left',
        'margin',
        'margin-top',
        'margin-bottom',
        'top',
        'left',
        'right',
        'bottom',
        'font-size'
      ],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 1
    }
  }
}
