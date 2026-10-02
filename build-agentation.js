const esbuild = require('esbuild');

esbuild.buildSync({
  entryPoints: ['src/agentation-entry.jsx'],
  bundle: true,
  minify: true,
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  outfile: 'js/agentation-loader.js'
});

console.log('Built js/agentation-loader.js successfully.');
