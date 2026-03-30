const babel = require('rollup-plugin-babel')
const { terser } = require('rollup-plugin-terser')

const isESM = process.env.BABEL_ENV === 'esm'

module.exports = (config) => {
  const { input, fileName, name } = config
  return {
    input: {
      input,
      external: isESM ? [] : ['dayjs'],
      plugins: [
        babel({
          exclude: 'node_modules/**'
        }),
        terser()
      ]
    },
    output: {
      file: fileName,
      format: isESM ? 'esm' : 'umd',
      name: name || 'dayjs',
      globals: isESM
        ? undefined
        : {
          dayjs: 'dayjs'
        },
      compact: true,
      preserveModules: isESM
    }
  }
}
