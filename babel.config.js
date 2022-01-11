module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        libraryName: 'element-plus',
        customStyleName: (name) => {
          return `element-plus/theme-chalk/${name}.css`
        },
        customName: (name) => {
          return `element-plus/lib/components/${name.slice(3)}`
        }
      }
    ]
  ]
}
