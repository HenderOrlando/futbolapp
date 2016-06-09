'use strict';

/**
 * @ngdoc function
 * @name futbolappApp.controller:PerfilUserCtrl
 * @description
 * # PerfilUserCtrl
 * Controller of the futbolappApp
 */
angular.module('futbolappApp')
  .controller('PerfilUserCtrl', function ($state, $stateParams, Connect, tools, $mdDialog, $q, $mdEditDialog, $element, $mdMedia, localStorageService) {
    var
      vm = this,
      model = {
        titulo: 'Usuarios',
        orm: 'user'
      },
      Model = null,
      list = {},
      attrsnoadd = [

      ],
      attrscount = [
        'municipio.jugadores',

        'departamento.municipios',

        'pais.departamentos',
        'pais.representantes',

        'tipodocid.jugadores',
        'tipodocid.representantes',
        'tipodocid.entrenadores',

        'posicion.jugadores',

        'disciplina.jugadores',
      ],
      attrshidden = [
        //'jugador.representantes',
        'jugador.representantesjugador',
        'jugador.cualidades',
        'jugador.avatar',
        //'jugador.cualidadesjugador',

        //'entrenador.jugadores'
        'entrenador.avatar',

        'cualidad.jugadores',
        'cualidad.cualidadjugadores',

        'representante.jugadoresrepresentante',
        'representante.avatar',

        'disciplina.posiciones',

        //'user.password',
      ]
      ;

    if(model){
      Model = new Connect(model.orm);
      vm.model = model;
      vm.list = [];
      vm.collections = {};
      vm.attrs = {};
      vm.promise = null;
      vm.selected = [];
      vm.opts = {};
      vm.count = 0;
      vm.loadList = loadList;
      vm.search = getSearch();
      vm.searchTerm = {};

      vm.getData = getData;
      vm.borrar = borrar;
      vm.editField = editField;
      vm.openSelect = openSelect;

      vm.openFormModel= openFormModel;
      vm.openForm = openForm;
      vm.saveOpts = saveOpts;
      vm.subModel = subModel;

      vm.openCualidades = openCualidades;
      vm.openArchivos = openArchivos;
      vm.openHistory = openHistory;

      vm.isNumber = tools.isNumber;

      vm.showHasCount = function (name){
        return attrscount.indexOf(model.orm + '.' + name) > -1;
      };

      Model.attrs().then(function(attrs){
        //console.log(attrs);
        for(var h = 0; h < attrshidden.length; h++){
          delete attrs[attrshidden[h].replace(model.orm + '.','')];
        }
        vm.attrs = attrs;
        //console.log(attrs)
        loadOpts(attrs);
      });

      loadList();

    }else{
      $state.go('perfil');
    }

    function findMenu(menuslug){
      //console.log(menuslug, tools.listMenu())
      return tools.listMenu().filter(function(item){
        return item.slug === menuslug;
      })[0];
    }

    function getSearch(){
      return {
        attrs: [],
        attrlist: [
          /*{
           id: 0,
           titulo: 'Título',
           slug: 'titulo'
           },
           {
           id: 1,
           titulo: 'Descripción',
           slug: 'descripcion'
           },*/
          {
            id: 2,
            titulo: 'Fechas',
            slug: 'fechas'
          }
        ],
        orderby: '',
        query: '',
        inicio: '',
        fin: '',
        limit: 5,
        page: 1,
        submit: function(){ loadList(); }
      };
    }

    function getCriteria(){
      var
        attrs = vm.search.attrs,
        orderby = vm.search.orderby,
        query = vm.search.query,
        inicio = vm.search.inicio,
        fin = vm.search.fin,
        limit = vm.search.limit,
        page = vm.search.page,
        criteria = {}
        ;
      /*console.log(attrs)
      console.log(orderby)*/
      criteria.limit = limit;
      criteria.skip = (limit * page) - limit;
      //criteria.populate = false;
      var populates = [
        'representantes',
        'cualidadesjugador',
        'jugadores',
        'municipios',
        'departamentos',
        'avatar',
      ];
      criteria.populate = populates.join(',');
      if(query && query.length > 0){
        criteria.where = {};
        if(vm.attrs.titulo){
          criteria.where.titulo = {
            contains: query
          };
        }else if(vm.attrs.username){
          criteria.where.username = {
            contains: query
          };
        }
        /*angular.forEach(vm.attrs, function(attr, name){
         if(attr.type && (attr.type === 'string' || attr.type === 'text')){
         criteria.where[name] = {
         contains: query
         }
         }
         });*/
        /*if(attrs && attr.length > 0){
         for(var h = 0; h < attrs.length; h++){
         criteria.where[attrs[h]]
         }
         }*/
      }
      //console.log(attrs, orderby, query, inicio, fin, limit, page)
      //console.log(criteria)
      return criteria;
    }

    function loadList(){
      var criteria = getCriteria();
      vm.promise = Model.find(criteria).then(function(rta){
        //console.log(rta);
        criteria.limit = -1;
        criteria.skip = 0;
        //criteria.populate = 'representantes,representantesjugador,cualidades,cualidadesjugador';
        //console.log(rta)
        vm.list = rta;
        list = {};
        Model.find(criteria).then(function(res){
          vm.count = res.length;
        });
        angular.forEach(vm.list, function(item, id){
          angular.forEach(item, function(value, key){
            if(angular.isArray(value)){
              vm.list[id][key] = value.map(function(ele){
                vm.collections[ele.id] = ele;
                return ele.id;
              });
            }
          });
          list[item.id] = angular.merge({}, item);
        });
        //console.log(vm.list)
      });
    }

    function getData(attrname, attr, item){
      var data = item[attrname];
      if(attr.model){
        data = data?data.titulo || data.username:'---';
      }else if(attr.collection){
        if(data.length > 0){
          data = data.map(function(item){
            return item.titulo || item.username;
          }).join(', ');
        }else{
          data = '---';
        }
      }else if(attr.type === 'date'){
        data = moment(data).format('DD [de] MMMM [de] YYYY');
      }else if(attr.type === 'time'){
        data = moment(data).format('HH:mm:ss');
      }else if(attr.type === 'datetime'){

      }
      return data;
    }

    function borrar($event){
      var queries = [];
      if(vm.selected.length > 0){
        vm.selected.filter(function(val, index){
          if(val.id){
            queries.push(deleteItem(val, index));
          }
        });
      }

      $q.all(queries).then(function(){
        loadList();
        vm.selected = [];
      });

      function deleteItem(val, index){
        return Model.remove({
          id: val.id
        }).then(function(){
          vm.selected.splice(index, 0);
        });
      }
    }

    function editField($event, name, attr, item){
      if(attr.type && !attr.enum){
        if($event){
          $event.preventDefault();
          $event.stopPropagation();
        }
        var
          tipo = (name === 'password'?'password':(attr.type === 'int' || attr.type === 'integer' || attr.type === 'float')?'number':(attr.type === 'string'?'text':attr.type)),
          config = {
            title: 'Editar ' + name + (name === 'titulo'?'/nombre':''),
            cancel: 'Cancelar',
            ok: 'Guardar',
            // messages: {
            //   test: 'I don\'t like tests!'
            // },
            type: tipo,
            modelValue: attr.type === 'float'?parseFloat(item[name]):(attr.type === 'int' || attr.type === 'integer'?parseInt(item[name]):(attr.type === 'date')?new Date(item[name]):item[name]),
            placeholder: name,
            save: function (input) {
              var tmp = angular.merge({}, item);
              if(name !== 'password' || (name === 'password' && input.$modelValue && input.$modelValue.length)){
                tmp[name] = input.$modelValue;
                Model.update(tmp);
              }
            },
            targetEvent: $event
          }
          ;

        if(attr.type === 'string'){
          config.validators = {
            'md-maxlength': 60
          };
        }

        if(attr.type === 'text'){
          config.validators = {
            'md-maxlength': 140
          };
        }

        var promise = $mdEditDialog.large(config);

        /*promise.then(function (ctrl) {
         var input = ctrl.getInput();

         input.$viewChangeListeners.push(function () {
         input.$setValidity('test', input.$modelValue !== 'test');
         });
         });*/
      }
    }

    function openFormModel($event, item, name, attr){
      if($event){
        $event.preventDefault();
        $event.stopPropagation();
      }

      var
        modelname = attr.collection,
        ConnectionModel = new Connect(modelname),
        config = {
          controller: 'FormCtrl',
          controllerAs: 'form',
          templateUrl: 'views/formdialog.html',
          parent: angular.element(document.body),
          targetEvent: $event,
          locals: {
            vars: {
              name: name,
              attr: attr,
              item: item,
              este: vm.openFormModel,
              titulo: 'Agregando ' + attr.collection,
              attrs: [],
              modelname: modelname,
              model: angular.merge({}, ConnectionModel)
            }
          },
          clickOutsideToClose: true
        }
        ;
      ConnectionModel.attrs().then(function(attrs){
        config.locals.vars.attrs = attrs;
        $mdDialog.show(config)
          .then(function(rta) {
            // Bien
            if(rta && rta.id){
              ConnectionModel.find({
                id: rta.id,
                populate: attr.collection
              }).then(function(ele){
                ele = ele[attr.collection];
                if(ele && ele.id){
                  vm.collections[ele.id] = ele;
                  item[name].push(ele.id);
                }
              });
            }else if(angular.isArray(rta)){
              var ids = rta.map(function(item){
                return item.id;
              });
              rta.filter(function(ele){
                Model.add({
                  id: item.id,
                  association: name,
                  fk: ele.id
                }).then(function(elem){
                  item[name].push(ele);
                });
              });
            }
          }, function() {
            // Cancelado
          });
      });
    }
    function openForm($event, obj){
      var
        titulo = (obj && obj.id?'Modificando':'Agregando') + ' ' + vm.model.titulo
        ;
      $mdDialog.show({
        controller: 'FormCtrl',
        controllerAs: 'form',
        templateUrl: 'views/formdialog.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        locals: {
          vars: {
            este: vm.openForm,
            titulo: titulo,
            attrs: vm.attrs,
            modelname: model.orm,
            model: angular.merge({}, Model),
            obj: angular.isArray(obj)?obj[0]:obj
          }
        },
        clickOutsideToClose: true
      })
        .then(function(rta) {
          // Bien
          //console.log('cerrado menu')
          //console.log(rta)
          if(rta && rta.id){
            loadList();
          }
        }, function() {
          //console.log('cancelado menu')
          // Cancelado
        });
    }

    function loadOpts(attrs){
      var Connection = new Connect();
      angular.forEach(attrs, function(attr, name){
        if(attr.enum || attr.collection || attr.model){
          vm.searchTerm[name] = '';
          vm.opts[name] = [];
          if(attr.enum){
            for(var h = 0; h < attr.enum.length; h++){
              vm.opts[name].push({
                id: attr.enum[h],
                titulo: attr.enum[h]
              });
            }
          }else if(attr.model || attr.collection){
            Connection.find(attr.model || attr.collection, {limit: -1}).then(function(list){
              /*if(name === 'cualidadesjugador'){
               console.log(list)
               }*/
              //console.log(list)
              vm.opts[name] = list;
            });
          }
        }
      });
    }

    function openSelect(name, item){
      $element.find('input.md-header-searchbox').on('keydown', function(ev) {
        ev.stopPropagation();
      });
    }

    function saveOpts(name, item){
      var
        update = angular.merge({}, item),
        tmp = list[item.id]
        ;

      if(tmp[name] !== item[name]){
        angular.forEach(update, function(el, nameattr){
          if(nameattr.indexOf('$') > -1 || (vm.attrs[nameattr] && name !== nameattr && !vm.attrs[nameattr].type)){
            delete update[nameattr];
          }
        });

        Model.update(update).then(function(newitem){
          list[newitem.id] = newitem;
        });
      }

      vm.selected = vm.selected.filter(function(select){
        return select.id !== item.id;
      });
    }

    function subModel(name, attr, item, subitem){
      //console.log(name, attr, item, subitem);

      Model.sub({
        id: item.id,
        //association: attr.collection,
        association: name,
        fk: subitem.id || subitem
      }).then(function(rta){
        //console.log(rta)
        loadList();
      });
    }

    function openCualidades($event, jugador){
      if($event){
        $event.preventDefault();
        $event.stopPropagation();
      }

      var config = {
        controller: 'CualidadesCtrl',
        controllerAs: 'cualidades',
        templateUrl: 'views/cualidadesdialog.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        locals: {
          jugador: jugador
        },
        fullscreen: !$mdMedia('gt-sm')
      };
      //$mdBottomSheet.show(config);
      $mdDialog.show(config);
    }

    function openArchivos($event, item){
      if($event){
        $event.preventDefault();
        $event.stopPropagation();
      }

      var config = {
        controller: 'ArchivosCtrl',
        controllerAs: 'archivos',
        templateUrl: 'views/archivosdialog.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        locals: {
          item: item,
          modelname: model.orm
        },
        fullscreen: !$mdMedia('gt-sm')
      };
      //$mdBottomSheet.show(config);
      $mdDialog.show(config).then(function(){
        loadList();
      });
    }

    function openHistory($event, jugador){
      if($event){
        $event.preventDefault();
        $event.stopPropagation();
      }

    }

  });
