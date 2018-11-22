module.exports = {
  assetsDir: 'static',
  lintOnSave: true,
  runtimeCompiler: true, // allows the template option in components
  devServer: {
    proxy: {
      '/facetter': {
        target: process.env.BASE_URL || 'http://localhost:5000/',
        changeOrigin: true
      },
      '/klasser': {
        target: process.env.BASE_URL || 'http://localhost:5000/',
        changeOrigin: true
      }
    }
  }
}
