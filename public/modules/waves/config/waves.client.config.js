'use strict';

// Configuring the Articles module
angular.module('waves').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Waves', 'waves', 'dropdown', '/waves(/create)?');
		Menus.addSubMenuItem('topbar', 'waves', 'List Waves', 'waves');
		Menus.addSubMenuItem('topbar', 'waves', 'New Wave', 'waves/create');
	}
]);