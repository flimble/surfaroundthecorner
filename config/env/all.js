'use strict';

module.exports = {
	app: {
		title: 'Surf Around The Corner',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'http://fonts.googleapis.com/css?family=Bree+Serif',
				'http://fonts.googleapis.com/css?family=Open+Sans',
				'http://fonts.googleapis.com/css?family=Playfair+Display',
				'http://fonts.googleapis.com/css?family=Dancing+Script',
				'http://fonts.googleapis.com/css?family=Nunito',
				//'client/vendor/angular-ui-select/dist/select.css',
				/*'client/build/css/main.css',
				'client/build/css/mixins.css',
				'client/build/css/variables.css',*/
				'client/build/css/select.css',
				'client/vendor/bootstrap/dist/css/bootstrap.css'
			],
			js: [
				'http://maps.google.com/maps/api/js?libraries=places&sensor=false',
				'client/vendor/jquery/dist/jquery.js',
				'client/build/js/app.js'
				/*'public/vendor/angular/angular.js',
				'public/vendor/angular-resource/angular-resource.js', 
				'public/vendor/angular-cookies/angular-cookies.js', 
				'public/vendor/angular-animate/angular-animate.js',
				'public/vendor/angular-touch/angular-touch.js', 
				'public/vendor/angular-sanitize/angular-sanitize.js', 
				'public/vendor/angular-ui-router/release/angular-ui-router.js',
				'public/vendor/angular-ui-utils/ui-utils.js',
				'public/vendor/jquery/dist/jquery.js',
				'public/vendor/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/vendor/angular-ui-select/dist/select.js',
				'public/vendor/ngAutocomplete/src/ngAutocomplete.js',
				'public/vendor/ng-lodash/build/ng-lodash.js',
				'public/vendor/ng-backstretch/dist/ng-backstretch.js',
				'public/vendor/ngFitText/src/ng-FitText.js',
				'public/vendor/lodash/dist/lodash.js',
				'public/vendor/ngmap/build/scripts/ng-map.js',*/

				//'http://maps.googleapis.com/maps/api/js?libraries=places&sensor=false'
			]
		},
		css: [
			'build/**/*.css'

		],
		js: [
			'client/build/js/app.js'
		],
		tests: [
			'test/client/home.client.controller.test.js'
		]
	}
};