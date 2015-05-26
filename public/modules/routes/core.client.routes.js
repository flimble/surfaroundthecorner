'use strict';

// Setting up route
/**
 * @ngInject
 */
function Routes($stateProvider, $urlRouterProvider) {
	// Redirect to home view when route not found
	$urlRouterProvider.otherwise('/');

	// Home state routing
	$stateProvider.
	state('home', {
		url: '/',
		templateUrl: 'modules/core/views/home.client.view.html'
	}).
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
	}).
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
	}).
	state('bylocationWave', {
		url: '/waves-by-location',
		templateUrl: 'modules/waves/views/waves-home.client.view.html'
	});
}

module.exports = Routes;