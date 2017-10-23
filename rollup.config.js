import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/index.js',
  output: {
    file: 'build/index.bundle.js',
    format: 'umd',
  },
  name: 'redux-describe',
  plugins: [
    resolve({
      jsnext: true,
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    }),
    uglify(),
  ],
}
