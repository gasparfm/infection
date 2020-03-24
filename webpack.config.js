const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'public_html/js'),
    filename: 'infection.js'
  },
  entry: {
    main: [
      path.resolve(__dirname, 'src/util.js'),
      path.resolve(__dirname, 'src/simulator.js'),
      path.resolve(__dirname, 'src/ball.js'),
      path.resolve(__dirname, 'src/userui.js'),
      path.resolve(__dirname, 'src/infection-main.js')
    ]
  }
}
