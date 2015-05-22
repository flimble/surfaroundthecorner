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
				'public/vendor/components-font-awesome/css/font-awesome.css',
				'public/vendor/angular-ui-select/dist/select.css',
				'http://fonts.googleapis.com/css?family=Bree+Serif',
				'http://fonts.googleapis.com/css?family=Open+Sans',
				'http://fonts.googleapis.com/css?family=Playfair+Display',
				'http://fonts.googleapis.com/css?family=Dancing+Script',
				'http://fonts.googleapis.com/css?family=Nunito'

				//'http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css'

			],
			js: [
				'public/vendor/angular/angular.js',
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
				'http://maps.google.com/maps/api/js',
				'public/vendor/ng-lodash/build/ng-lodash.js',
				'public/vendor/ng-backstretch/dist/ng-backstretch.js',
				'public/vendor/ngFitText/src/ng-FitText.js',
				'public/vendor/lodash/dist/lodash.js',
				'public/vendor/ngmap/build/scripts/ng-map.js',
				'public/dist/surfaroundthecorner-shared.js'
				//'http://maps.googleapis.com/maps/api/js?libraries=places&sensor=false'
			]
		},
		css: [
			'public/less/*.css',
			'public/modules/**/css/*.css'

		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/utils/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/vendor/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
