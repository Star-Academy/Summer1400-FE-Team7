// Karma configuration
// Generated on Mon Aug 09 2021 20:48:21 GMT+0430 (Iran Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ['jasmine-dom' ,'jasmine'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'pages/**/*.html', type: 'dom'}, 

      "pages/auth/../../source/utils/env.js",
      "pages/auth/../../source/utils/fetchInerceptor.js",
      "pages/auth/../../source/auth/inputValidation.js",
      "pages/auth/../../source/auth/register.js",
      "pages/auth/../../source/auth/login.js",
      "pages/auth/style.js",
  
      "pages/dashboard/../../source/utils/env.js",
      "pages/dashboard/../../source/utils/fetchInterceptor.js",
      "pages/dashboard/utils.js",
      "pages/dashboard/placeholders.js",
      "pages/dashboard/style/styles.js",
      "pages/dashboard/mobile/mobile.js",
      "pages/dashboard/songList.js",
      "pages/dashboard/playlist.js",
      "pages/dashboard/song.js",
      "pages/dashboard/search.js",
      "pages/dashboard/sideMenu.js",
      "pages/dashboard/musicControllers.js",
      "pages/dashboard/../../source/auth/logout.js",


      "pages/landing/app.js" ,

      "test/test.js",
      "test/test.spec.js"
    ],
    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser instances should be started simultaneously
    concurrency: Infinity
  })
}
