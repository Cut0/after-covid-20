module.exports = {
  transpileDependencies: ['vuetify'],
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.extractComments = true
      config.devtool = 'source-map'
    }
  }
}
