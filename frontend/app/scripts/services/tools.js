'use strict';

/**
 * @ngdoc service
 * @name futbolappApp.tools
 * @description
 * # tools
 * Service in the futbolappApp.
 */
angular.module('futbolappApp')
  .service('tools', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      listMenu: listMenu,
      isNumber: isNumber,
      getDateHumanized: getDateHumanized
    };

    function listMenu(){
      return [
        {
          orm: 'jugador',
          slug: 'jugadores',
          titulo: 'Jugadores',
          descripcion: 'Administra los Jugadores'
        },
        {
          orm: 'entrenador',
          slug: 'entrenadores',
          titulo: 'Entrenadores',
          descripcion: 'Administra los Entrenadores'
        },
        {
          orm: 'representante',
          slug: 'representantes',
          titulo: 'Representantes',
          descripcion: 'Administra los Representantes'
        },
        {
          orm: 'cualidad',
          slug: 'cualidades',
          titulo: 'Cualidades',
          descripcion: 'Administra las Cualidades'
        },
        {
          orm: 'disciplina',
          slug: 'disciplinas',
          titulo: 'Disciplinas',
          descripcion: 'Administra las Disciplinas'
        },
        {
          orm: 'posicion',
          slug: 'posiciones',
          titulo: 'Posiciones',
          descripcion: 'Administra las Posiciones'
        },
        {
          orm: 'tipodocid',
          slug: 'tipo-doc-id',
          titulo: 'Tipos de Documento de Itentidad',
          descripcion: 'Administra los Tipos de Documentos de Identidad'
        },
        {
          orm: 'pais',
          slug: 'paises',
          titulo: 'Países',
          descripcion: 'Administra los Países'
        },
        {
          orm: 'departamento',
          slug: 'departamentos',
          titulo: 'Departamentos',
          descripcion: 'Administra los Departamentos'
        },
        {
          orm: 'municipio',
          slug: 'municipios',
          titulo: 'Municipios',
          descripcion: 'Administra los Municipios'
        }
      ];
    }

    function isNumber(attr){
      var type = (attr && attr.type) || null;
      return type === 'int' || type === 'integer' || type === 'float';
    }

    function getDateHumanized(date){
      date = moment(date);

      return date.fromNow();
    }
  });
