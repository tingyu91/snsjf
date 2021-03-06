/* eslint-disable node/no-unpublished-import */
/* eslint-disable node/no-unsupported-features/es-syntax */

// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

import {
  join,
  dirname
} from 'path';
import url from 'url';

export default (config) => {

  const __dirname = dirname(url.fileURLToPath(import.meta.url));
  const coveragePath = (join(__dirname, '../coverage/snsjf_app'));

  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      import('karma-jasmine'),
      import('karma-chrome-launcher'),
      import('karma-jasmine-html-reporter'),
      import('karma-coverage-istanbul-reporter'),
      import('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: coveragePath,
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'kjhtml'],
    // web server port
    port: 9876,
    proxies: {
      '/api': {
        target: 'http://localhost:3000/api',
        changeOrigin: true
      }
    },
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
    browserNoActivityTimeout: 60000, //default 10000
    browserDisconnectTimeout: 10000, // default 2000
    browserDisconnectTolerance: 1, // default 0
    captureTimeout: 60000
  });
}
