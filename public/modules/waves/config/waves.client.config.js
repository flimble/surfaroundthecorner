'use strict';

// Configuring the Articles module
angular.module('waves').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Waves', 'waves', 'dropdown', '/waves(/create)?');
		Menus.addSubMenuItem('topbar', 'waves', 'All', 'waves');
		Menus.addSubMenuItem('topbar', 'waves', 'By Region', 'waves-by-region');
		Menus.addSubMenuItem('topbar', 'waves', 'Create New', 'waves/create');
	}
]);
