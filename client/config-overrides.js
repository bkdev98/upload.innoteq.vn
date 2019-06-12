const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@font-family': `'Open Sans', sans-serif`,
      '@primary-color': '#557DE8',
      '@layout-body-background': '#f0f2f5',
      '@layout-header-background': '#ffffff',
      '@layout-footer-background': '#ffffff',
      '@layout-header-padding': '0px',
      '@layout-footer-padding': '20px 0px',
      '@form-item-margin-bottom': '24px;',
    },
  }),
);