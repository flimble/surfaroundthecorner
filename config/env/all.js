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
				'public/lib/components-font-awesome/css/font-awesome.css',
				'public/lib/angular-ui-select/dist/select.css',
				'http://fonts.googleapis.com/css?family=Bree+Serif',
				'http://fonts.googleapis.com/css?family=Open+Sans',
				'http://fonts.googleapis.com/css?family=Playfair+Display',
				'http://fonts.googleapis.com/css?family=Dancing+Script',
				'http://fonts.googleapis.com/css?family=Nunito'

				//'http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css'

			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/jquery/dist/jquery.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/angular-ui-select/dist/select.js',
				'http://maps.google.com/maps/api/js',
				'public/lib/ng-lodash/build/ng-lodash.js',
				'public/lib/ng-backstretch/dist/ng-backstretch.js',
				'public/lib/ngFitText/src/ng-FitText.js',
				'public/lib/lodash/dist/lodash.js',
				'public/lib/ngmap/build/scripts/ng-map.js'
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
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
