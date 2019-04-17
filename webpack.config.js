module.exports = {
  entry: {
    app: './app.js'
  },
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
};
