'use strict';

/**
 * @ngdoc function
 * @name futbolappApp.controller:FormCtrl
 * @description
 * # FormCtrl
 * Controller of the futbolappApp
 */
angular.module('futbolappApp')
  .controller('FormCtrl', function ($mdDialog, vars, Connect) {
    var
      vm = this,
      attrjugador = [
        'representantes',
        'representantesjugador',
        'cualidades',
        'cualidadesjugador'
      ],
      este = vars.este || false,
      Connection = new Connect()
    ;

    vm.nextForm = !!este;
    vm.today = new Date();
    vm.titulo = vars.titulo;
    vm.name = vars.name;
    vm.attr = vars.attr;
    vm.item = vars.item;
    vm.attrs = angular.merge({}, vars.attrs);
    vm.modelname = vars.modelname;
    vm.obj = vars.obj || {};
    vm.opts = {};

    vm.allList = [];
    vm.list = [];
    vm.filterSelected = true;
    vm.hasList = hasList;
    vm.saveList = saveList;
    vm.addToList = addToList;
    vm.querySearch = querySearch;
    loadList();

    if(vars.attr && vars.attr.via){
      vm.obj[vars.attr.via] = vars.item.id;
    }

    var Model = new Connect(vm.modelname);

    vm.loadOpt = loadOpt;
    vm.submit = submit;
    vm.cancel = cancel;
    vm.openForm = openForm;

    if(vm.modelname === 'jugador'){
      for(var h = 0; h < attrjugador.length; h++){
        delete vm.attrs[attrjugador[h]];
      }
    }

    //console.log(vm.titulo, vm.attrs, vm.obj)

    loadOpts();

    function cancel(){
      $mdDialog.hide();
      //$mdDialog.hide('cerrado');
    }

    function loadOpts(){
      vm.opts = {};
      angular.forEach(vm.attrs, function(attr, name){
        if(attr.collection || attr.model || attr.enum){
          vm.opts[name] = [];
          loadOpt(name, attr);
        }
      });
    }

    function loadOpt(name, attr){
      if(attr.enum){
        for(var h = 0; h < attr.enum.length; h++){
          vm.opts[name].push({
            id: attr.enum[h],
            titulo: attr.enum[h]
          });
        }
      }else{
        Connection.find(attr.collection || attr.model, {
          limit: -1
        }).then(function(list){
          vm.opts[name] = list;
        });
      }
    }

    function submit(){
      //console.log(vm.obj)
      Model.create(vm.obj).then(function(rta){
        $mdDialog.hide(rta);
      });
    }

    function openForm($event, name, attr){
      var
        titulo = 'Agregando ' + name,
        modelname = attr.model || attr.collection,
        ConnectionForm = new Connect(modelname),
        config = {
          controller: 'FormCtrl',
          controllerAs: 'form',
          templateUrl: 'views/formdialog.html',
          parent: angular.element(document.body),
          targetEvent: $event,
          locals: {
            vars: {
              //este: este,
              titulo: titulo,
              attrs: vm.attrs,
              modelname: modelname,
              model: ConnectionForm
            }
          },
          clickOutsideToClose: true
        }
      ;
      ConnectionForm.attrs().then(function(attrs){
        config.locals.vars.attrs = attrs;
        //console.log(este)
        $mdDialog.show(config)
          .then(function(rta) {
            // Bien
            //console.log('cerrado form')
            //console.log(rta)
            //console.log(vars)
            if(vars.name && vars.attr && vars.item){
              este(null, vars.item, vars.name, vars.attr);
            }else if(este){
              este(null, vm.obj);
            }
          }, function() {
            //console.log('cancel form')
            if(vars.name && vars.attr && vars.item){
              este(null, vars.item, vars.name, vars.attr);
            }else if(este){
              este(null, vm.obj);
            }
            // Cancelado
          });
      });
    }

    function querySearch (criteria) {
      return vm.allList.filter(createFilterFor(criteria)) || [];
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(item) {
        return item.titulo.toLowerCase().indexOf(lowercaseQuery) > -1;
      };
    }
    function loadList() {
      Model = new Connect(vm.modelname);
      return Model.find({}).then(function(res){
        vm.allList = res;
        if(vm.item && vm.name && vm.item[vm.name] && vm.item[vm.name].length > 0){
          vm.list = res.filter(function(item){
            var rta = vm.item[vm.name].filter(function(ele){
              return ele === item.id;
            });
            return rta.length > 0;
          });
        }
      });
    }

    function hasSaveList(){
      return vm.list.filter(function(item){
          if(vm.item[vm.name] && vm.item[vm.name].length > 0){
            var rta = vm.item[vm.name].filter(function(ele){
              return ele !== item.id;
            });
            return rta.length > 0;
          }
          return true;
        }).length === 0;
    }

    function hasList(item){
      return !!vm.list.filter(function(ele){
        return ele.id === item.id;
      })[0];
    }

    function addToList(item){
      vm.list.push(item);
    }

    function saveList(){
      /*var ids = vm.list.map(function(item){
        return item.id;
      });*/
      $mdDialog.hide(vm.list);
    }

  });
