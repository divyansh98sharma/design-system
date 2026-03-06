// Plain-object theme — avoids @storybook/theming peer-dep issues with Storybook v10.
// Storybook's setConfig and docs.theme both accept a raw ThemeVars object.
const theme = {
  base: 'light' as const,

  // Brand
  brandTitle: 'eCW Design System',
  brandUrl: '/',
  brandTarget: '_self',

  // Typography
  fontBase: "'Open Sans', system-ui, sans-serif",
  fontCode: "'Courier New', monospace",

  // Colors
  colorPrimary: '#0378A7',
  colorSecondary: '#0378A7',

  // UI chrome
  appBg: '#f7f7f7',
  appContentBg: '#ffffff',
  appBorderColor: '#e1e1e1',
  appBorderRadius: 4,

  // Text
  textColor: '#2d2d2d',
  textInverseColor: '#ffffff',
  textMutedColor: '#717171',

  // Toolbar
  barTextColor: '#4b4b4b',
  barSelectedColor: '#0378A7',
  barHoverColor: '#0378A7',
  barBg: '#ffffff',

  // Form controls
  inputBg: '#ffffff',
  inputBorder: '#e1e1e1',
  inputTextColor: '#2d2d2d',
  inputBorderRadius: 4,
};

export default theme;
