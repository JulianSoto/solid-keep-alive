import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  input: 'src/index.jsx',
  output: {
    dir: 'dist',
    format: 'es',
  },
  plugins: [
    peerDepsExternal(),
    resolve(),
    babel({ babelHelpers: 'bundled', presets: ['solid'] }),
  ],
};
