import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
  input: 'src/index.js',
  output: {
    file: 'build/index.bundle.js',
    format: 'umd'
  },
  name: 'redux-describe',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ]
};