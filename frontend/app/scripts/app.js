'use strict';

/**
 * @ngdoc overview
 * @name futbolappApp
 * @description
 * # futbolappApp
 *
 * Main module of the application.
 */
angular
  .module('futbolappApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngMaterial',
    'ngScrollable',
    'ngFileUpload',
    'md.data.table',
    'angularMoment',
    'LocalStorageModule',
    'ngMaterialDatePicker'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $mdIconProvider, $httpProvider, localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('futbolapp');

    $httpProvider.interceptors.push('httpInterceptor');

    $mdIconProvider.defaultIconSet('images/mdi.svg');

    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .state('perfil', {
        url: '/:username',
        templateUrl: 'views/perfil.html',
        controller: 'PerfilCtrl',
        controllerAs: 'perfil'
      })
      .state('perfil.menu', {
        url: '/:menu',
        templateUrl: 'views/menu.html',
        controller: 'MenuCtrl',
        controllerAs: 'menu'
      })
    ;
  })
  .run(function(amMoment, $rootScope, localStorageService, $state){
    var storage = localStorageService;
    amMoment.changeLocale('es');

    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
      if(toState.name !== 'main' && !storage.get('userid')){
        e.preventDefault();
        $state.go('main');
      }
      /*if (toState.module === 'private' && !$cookies.Session) {
        // If logged out and transitioning to a logged in page:
        e.preventDefault();
        $state.go('public.login');
      } else if (toState.module === 'public' && $cookies.Session) {
        // If logged in and transitioning to a logged out page:
        e.preventDefault();
        $state.go('tool.suggestions');
      };*/
    });
  })
;
