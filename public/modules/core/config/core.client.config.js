'use strict';

// Config HTTP Error Handling
angular.module('core').config(['$httpProvider',
    function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);
