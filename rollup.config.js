import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

let outputFolder = 'lib/';
let outputDistFolder = 'dist/js/';
let inputFolder = 'src/';
let name = 'Cotton';

export default [
  {
    input: inputFolder + 'index.js',
    output: {
      file: outputDistFolder + 'cotton.min.js',
      format: 'umd',
      name: name
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      }),
      terser()
    ]
  },
  {
    input: inputFolder + 'index.js',
    output: {
      file: outputFolder + 'cotton.min.js',
      format: 'umd',
      name: name
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      }),
      terser()
    ]
  },
  {
    input: inputFolder + 'index.js',
    output: {
      file: outputFolder + 'cotton.js',
      format: 'umd',
      name: name
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      })
    ]
  }
];
