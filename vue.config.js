module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    host: 'localhost',
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '^/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
    }
  }
}