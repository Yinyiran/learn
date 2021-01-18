module.exports = {
  //...
  devServer: {

    proxy: {
      // ()                             // - matches any path, all requests will be proxied.
      // ('/')                          // - matches any path, all requests will be proxied.
      // ('/api')                       // - matches paths starting with /api
      // ('**')                         // matches any path, all requests will be proxied.
      // ('**/*.html')                  // matches any path which ends with .html
      // ('/*.html')                    // matches paths directly under path - absolute
      // ('/api/**/*.html')             // matches requests ending with .html in the path of / api
      // (['/api/**', '/ajax/**'])      // combine multiple patterns
      // (['/api/**', '!**/bad.json'])  // exclusion
      '/api': 'http://localhost:3000'
    }
  }
};