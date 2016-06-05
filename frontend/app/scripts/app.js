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
    'md.data.table',
    'angularMoment',
    'ngMaterialDatePicker'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $mdIconProvider) {

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
  .run(function(amMoment){
    amMoment.changeLocale('es');
  })
;
