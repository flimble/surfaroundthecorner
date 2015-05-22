'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'SurfAroundTheCorner';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils','ui.select','ngLodash','ngFitText','ngAnimate','ngMap'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};



	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();

'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('articles');
'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('core');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('waves');
'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		/*Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');*/
	}
]);

'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listArticles', {
			url: '/articles',
			templateUrl: 'modules/articles/views/list-articles.client.view.html'
		}).
		state('createArticle', {
			url: '/articles/create',
			templateUrl: 'modules/articles/views/create-article.client.view.html'
		}).
		state('viewArticle', {
			url: '/articles/:articleId',
			templateUrl: 'modules/articles/views/view-article.client.view.html'
		}).
		state('editArticle', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html'
		});
	}
]);
'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
	function($resource) {
		return $resource('articles/:articleId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Config HTTP Error Handling
angular.module('core').config(['$httpProvider',
    function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);

'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', '$location', 'Authentication',
	function($scope, $location, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		if ($scope.authentication.user) {
			console.log('logged in. directing to waves page');
			$location.path('/waves-by-region');
		}
	}
]);

'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {

		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];

		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);

'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('register', {
			url: '/register',
			templateUrl: 'modules/users/views/authentication/register.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);

'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('waves')
	.run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Waves', 'waves', 'dropdown', '/waves(/create)?');
		Menus.addSubMenuItem('topbar', 'waves', 'All', 'waves');
		Menus.addSubMenuItem('topbar', 'waves', 'By Region', 'waves-by-region');
		Menus.addSubMenuItem('topbar', 'waves', 'Create New', 'waves/create');
	}
]);

'use strict';

//Setting up route
angular.module('waves').config(['$stateProvider',
	function($stateProvider) {
		// Waves state routing
		$stateProvider.
		state('listWaves', {
			url: '/waves',
			templateUrl: 'modules/waves/views/list-waves.client.view.html'
		}).
		state('createWave', {
			url: '/waves/create',
			templateUrl: 'modules/waves/views/create-wave.client.view.html'
		}).
		state('viewWave', {
			url: '/waves/:waveId',
			templateUrl: 'modules/waves/views/view-wave.client.view.html'
		}).
		state('editWave', {
			url: '/waves/:waveId/edit',
			templateUrl: 'modules/waves/views/edit-wave.client.view.html'
		}).
		state('byregionWave', {
				url: '/waves-by-region',
				templateUrl: 'modules/waves/views/findmynearest-waves.client.view.html'
		});
	}
]);

'use strict';

// Location controller
angular.module('waves')
    .controller('LocationController', ['$scope', '$stateParams', '$location','lodash',


        function ($scope, $stateParams, $location, lodash) {

            $scope.currentLocation = {};

            $scope.init = $scope.getCurrentCoordinates = function() {
              if(navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(function(position){
                      $scope.currentLocation = position.coords;
                  });
              }
            };
        }
    ]);

'use strict';

// Waves controller
angular.module('waves')

    .controller('WavesController', ['$scope', '$stateParams', '$location', 'WavesRestClientService', 'lodash','coordinateConversionFactory',
        function ($scope, $stateParams, $location, Waves, lodash, coordinateSvc) {

            $scope.$on('mapInitialized', function (event, eventmap) {
                console.log('loading map');
                $scope.map = eventmap;
            });



            //$scope.wave = {};
            $scope.swell = {};
            $scope.swell.availableCompassDirections = ['NorthEast', 'East', 'SouthEast', 'South'];
            $scope.swell.compassDirectionsSelected = [];

            $scope.wind = {};
            $scope.wind.availableCompassDirections = ['North', 'NorthEast', 'East', 'SouthEast', 'South', 'SouthWest', 'West', 'NorthWest'];
            $scope.wind.compassDirectionsSelected = [];

            $scope.location = {};
            $scope.location.availableLocations = [
                {name: 'CentralCoast', state: 'New South Wales'},
                {name: 'SydneyNorth', state: 'New South Wales'},
                {name: 'SydneySouth', state: 'New South Wales'},
                {name: 'SouthCoast', state: 'New South Wales'},
                {name: 'Somewhere', state: 'Queensland'}
            ];
            $scope.location.selected = {};


            $scope.location.availableLocationsStateGroupBy = function (item) {
                return item.state;
            };

            $scope.createWave = {};
            $scope.createWave.SwellDirection = [];
            $scope.createWave.WindDirection = [];

            // Create new Wave
            $scope.create = function () {
                // Create new Wave object
                var wave = new Waves({
                    Name: this.Name,
                    CountryCode: this.CountryCode,
                    Experience: this.Experience,
                    Quality: this.Quality,
                    Region: this.Region,
                    State: this.State,
                    SwellDirection: $scope.createWave.SwellDirection,
                    SwellSize: this.SwellSize,
                    TideMovement: this.TideMovement,
                    TidePosition: this.TidePosition,
                    WindDirection: $scope.createWave.WindDirection,
                    WaveType: this.WaveType,
                    WaveDirection: this.WaveDirection
                });


                // Redirect after save
                wave.$save(function (response) {
                    $location.path('waves/' + response._id);

                    // Clear form fields
                    $scope.createWave.SwellDirection = [];
                    $scope.createWave.WindDirection = [];

                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            };


            // Remove existing Wave
            $scope.remove = function (wave) {
                if (wave) {
                    wave.$remove();

                    for (var i in $scope.waves) {
                        if ($scope.waves [i] === wave) {
                            $scope.waves.splice(i, 1);
                        }
                    }
                } else {
                    $scope.wave.$remove(function () {
                        $location.path('waves');
                    });
                }
            };

            // Update existing Wave
            $scope.update = function () {
                var wave = $scope.wave;

                wave.$update(function () {
                    $location.path('waves/' + wave._id);
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            };

            // Find a list of Waves
            $scope.find = function () {
                $scope.waves = Waves.query();
            };


            $scope.findByConditions = function (region, swellDirection, windDirection) {
                Waves.query().$promise.then(function (data) {
                    var selectedWaves = [];

                    data.forEach(function (item) {
                        if (region.name.length > 0 && region.name !== item.Region) {
                            return;
                        }
                        if (item.SwellDirection.length === 0 || item.SwellDirection.length === 0) {
                            return;
                        }
                        if (swellDirection.length > 0 && (lodash.intersection(swellDirection, item.SwellDirection) === 0)) {
                            return;
                        }
                        if (item.WindDirection.length === 0 || item.WindDirection[0].length === 0) {
                            return;
                        }
                        if (windDirection.length > 0 && (lodash.intersection(windDirection, item.WindDirection) === 0)) {
                            return;
                        }
                        selectedWaves.push(item);
                    });
                    $scope.waves = selectedWaves;
                });
            };

            $scope.join = function (a) {
                return a.join(',');
            };

            $scope.locations = function () {
                var destinations = ['Vancouver BC', 'Seattle'];
                var destinationsToParam = destinations.join('|');

            };


            $scope.splitCamelCaseToString = function (s) {
                return s.split(/(?=[A-Z])/).map(function (p) {
                    return p.charAt(0).toUpperCase() + p.slice(1);
                }).join(' ');
            };

            $scope.refreshMapMarker = function () {
                var pos = new google.maps.LatLng($scope.wave.Latitude, $scope.wave.Longitude);

                $scope.map.setCenter(pos);
                $scope.marker.setMap(null);
                $scope.marker.setMap($scope.map);
                $scope.marker.position = pos;
            };

            // Find existing Wave
            $scope.findOne = function () {
                Waves.get({
                    waveId: $stateParams.waveId
                }).$promise.then(function (data) {
                        var wave = data;

                        if (wave.Longitude && wave.Longitude.indexOf('\'') > -1) {
                            var lng = coordinateSvc.ddm.stringToDecimal(wave.Longitude);
                            var lat = coordinateSvc.ddm.stringToDecimal(wave.Latitude);
                            wave.Longitude = lng;
                            wave.Latitude = lat;
                        }

                        if ($scope.map) {
                            var pos = new google.maps.LatLng(wave.Latitude, wave.Longitude);

                            var marker = new google.maps.Marker({
                                position: pos,
                                map: $scope.map,
                                title: wave.Name,
                                draggable: true
                            });
                            $scope.marker = marker;
                            google.maps.event.addListener(marker, 'dragend', function (event) {
                                $scope.$apply(function () {
                                    $scope.wave.Latitude = event.latLng.lat().toFixed(7);
                                    $scope.wave.Longitude = event.latLng.lng().toFixed(7);
                                });
                            });

                            $scope.map.setCenter(pos);
                        }

                        $scope.wave = wave;
                    });
            };


        }
    ]);

'use strict';

angular.module('waves').factory('coordinateConversionFactory',['lodash',
    function (_) {

      
        function removeAt(s,i) {
            s = s.substring(0,i)+s.substring(i+1,s.length);
            return s;
        }

        function roundnum(x,p) {
            var i;
            var n=parseFloat(x);
            var m=n.toPrecision(p+1);
            var y=String(m);
            i=y.indexOf('e');
            if( i===-1 )	i=y.length;
            var j=y.indexOf('.');
            if( i>j && j!==-1 )
            {
                while(i>0)
                {
                    if(y.charAt(--i)==='0')
                        y = removeAt(y,i);
                    else
                        break;
                }
                if(y.charAt(i)==='.')
                    y = removeAt(y,i);
            }
            return y;
        }



        var degreesminutesdirection = function (degrees, minutes, direction) {
            var validDirections = ['N', 'E', 'S', 'W'],
                negativeDirections = ['W', 'S'];

            if (_.indexOf(validDirections, direction) === -1) throw 'invalid direction';

            degrees = degrees || 0;
            minutes = minutes || 0;

            var y = parseFloat(degrees) + parseFloat(minutes) / 60;
            y = roundnum(y, 6);


            if (_.indexOf(negativeDirections, direction) !== -1) {
                return y * -1;
            }
            return y;
        };



        return {
            //direction degrees minutes
            ddm: {
                stringToDecimal: function (inputString) {
                    if(!inputString) return 0;

                    var s = inputString.replace(/\s/g, '');
                    s = s.replace('°','|').replace('\'','|');
                    var arr = s.split('|');
                    console.log('arg:0 ' + arr[0] + 'arg:1 ' + arr[1] + 'arg:2' + arr[2]);
                    return degreesminutesdirection(arr[0],arr[1],arr[2]);
                },
                toDecimal: function(degrees, minutes, direction) {
                    return degreesminutesdirection(degrees, minutes, direction);
                }
            }
        };
    }]
);

'use strict';

//Waves service used to communicate Waves REST endpoints
angular.module('waves').factory('googleApiProvider', ['$resource', '$http',
    function ($resource, $http) {

        //  Wraps the callback function to convert the output to a javascript object
        var returnObjectFromJSON = function(callback) {
            if (typeof callback === 'function') {
                return function(err, jsonString) {

                    if (err){
                        callback(err);
                        return;
                    }

                    try {
                        callback(err, JSON.parse(jsonString));
                    } catch (e) {
                        callback(e);
                    }
                };
            }
            return false;
        };



        var gapiBaseUrl = 'https://maps.googleapis.com/maps/api';
        var apiKey = 'AIzaSyCSBGw0kiu_Nv3dPOBxxanMjuDyjEVA3aY';


        return {
            distanceMatrix: $resource('maps/distancematrix', {}, {
                query: {
                    method: 'GET', params: {API_KEY: apiKey}, isArray: false, headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true
                    }
                }
            }),
            distanceGet: function () {
                var dat;
                $http.jsonp(gapiBaseUrl + '/distancematrix/json?origins=Seattle&destinations=Sydney&callback=angular.callbacks._0').
                    success(function (data) {
                        console.log('1');
                        console.log(data);
                        dat = data;
                    }).
                    error(function (data) {
                        alert('ERROR: Could not get data.');
                    });
                console.log('2');
                console.log(dat);
                return dat;
            }
        };
    }
]);

'use strict';

//Waves service used to communicate Waves REST endpoints
angular.module('waves').factory('WavesRestClientService', ['$resource',
	function($resource) {
		return $resource('waves/:waveId', { waveId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
