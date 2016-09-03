(function (global) {
    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        '@angular/core': 'lib/@angular/core/bundles/core.umd.js',
        '@angular/common': 'lib/@angular/common/bundles/common.umd.js',
        '@angular/compiler': 'lib/@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser': 'lib/@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'lib/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/http': 'lib/@angular/http/bundles/http.umd.js',
        '@angular/router': 'lib/@angular/router/bundles/router.umd.js',
        '@angular/forms': 'lib/@angular/forms/bundles/forms.umd.js',
        'rxjs': 'lib/rxjs',
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
    };
    /*
    var ngPackageNames = [
      'common',
      'compiler',
      'core',
      'forms',
      'http',
      'platform-browser',
      'platform-browser-dynamic',
      'router',
      'router-deprecated',
      'upgrade'
    ];
    
    // Individual files (~300 requests):
    function packIndex(pkgName) {
        packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }
    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages['@angular/' + pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    }
    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);
    */
    var config = {
        map: map,
        packages: packages
    };

    System.config(config);
})(this);
