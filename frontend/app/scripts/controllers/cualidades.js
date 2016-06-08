'use strict';

/**
 * @ngdoc function
 * @name futbolappApp.controller:CualidadesCtrl
 * @description
 * # CualidadesCtrl
 * Controller of the futbolappApp
 */
angular.module('futbolappApp')
  .controller('CualidadesCtrl', function (jugador, Connect, tools, $mdDialog, $scope, $window) {
    //console.log(jugador)

    var
      vm = this,
      Cualidad = new Connect('cualidad'),
      CualidadJugador = new Connect('cualidadjugador'),
      w = angular.element($window)
    ;

    /*vm.window = {
      height: w.height(),
      width: w.width()
    };

    $scope.$watch(function(){
      return {
        height: w.height(),
        width: w.width()
      }
    }, function (newval){
      vm.window = newval;
    },true);*/

    vm.cualidades = [];
    vm.cualidadesjugador = {};
    vm.allcualidadesjugador = {};
    vm.showHistory = {};

    vm.deleteItemHistorial = deleteItemHistorial;
    vm.getDateHumanized = tools.getDateHumanized;

    vm.cancel = cancel;
    vm.submit = submit;
    vm.update = update;

    Cualidad.find('cualidad', {}).then(function(list){
      //console.log(list)
      vm.cualidades = list;
      for(var h = 0; h < list.length; h++){
        vm.showHistory[list[h].id] = false;
      }
    });

    CualidadJugador.find({
      limit: -1,
      jugador: jugador.id,
      actual: true
    }).then(function(list){
      //console.log(list)
      angular.forEach(list, function(cualidadjugador){
        vm.cualidadesjugador[cualidadjugador.cualidad.id] = cualidadjugador;
      });
      //console.log(angular.merge({}, vm.cualidadesjugador))
    });

    CualidadJugador.find({
      limit: -1,
      jugador: jugador.id
    }).then(function(list){
      //console.log(list)
      angular.forEach(list, function(cualidadjugador){
        vm.allcualidadesjugador[cualidadjugador.cualidad.id] = vm.allcualidadesjugador[cualidadjugador.cualidad.id] || [{}];
        if(cualidadjugador.actual){
          vm.allcualidadesjugador[cualidadjugador.cualidad.id][0] = cualidadjugador;
        }else{
          vm.allcualidadesjugador[cualidadjugador.cualidad.id].push(cualidadjugador);
        }
      });
      //console.log(angular.merge({}, vm.allcualidadesjugador))
    });

    function submit(cualidad){
      var data = {};
      angular.forEach(vm.cualidadesjugador[cualidad.id], function(val, key){
        data[key] = val.id || val;
      });

      data.cualidad = cualidad.id;
      data.jugador = jugador.id;

      delete data.createdAt;
      delete data.updatedAt;
      delete data.id;
      //console.log(data);
      CualidadJugador.create(data).then(function(rta){
        //console.log(rta)
        if(vm.cualidadesjugador[cualidad.id].id){
          //vm.cualidadesjugador[cualidad.id].actual = false;
          //delete vm.cualidadesjugador[cualidad.id].valor;
          var data2 = {
            actual: false,
            id: vm.cualidadesjugador[cualidad.id].id
          };
          /*angular.forEach(vm.cualidadesjugador[cualidad.id], function(val, key){
            if(key !== 'createdAt' && key !== 'updatedAt' && key !== 'logro' && key !== 'maximo'){
              data2[key] = val.id || val;
            }
          });*/
          //console.log(data2);
          CualidadJugador.update(data2).then(function(rta1){
            //console.log(rta1)
            vm.cualidadesjugador[cualidad.id] = rta;
            vm.allcualidadesjugador[cualidad.id].unshift(rta);
          });
        }else{
          vm.cualidadesjugador[cualidad.id] = rta;
          if(!vm.allcualidadesjugador[cualidad.id]){
            vm.allcualidadesjugador[cualidad.id] = [];
          }
          vm.allcualidadesjugador[cualidad.id].unshift(rta);
        }
        //console.log(rta)
      });
    }

    function update(cualidad){
      //console.log(vm.cualidadesjugador[cualidad.id])
      var data = {};
      angular.forEach(vm.cualidadesjugador[cualidad.id], function(val, key){
        data[key] = val.id || val;
      });
      CualidadJugador.update(data).then(function(rta){
        //console.log(rta)
        var cualidadjugadoractual = vm.allcualidadesjugador[cualidad.id].filter(function(item){
          return item.actual;
        })[0];
        if(cualidadjugadoractual){
          cualidadjugadoractual = rta;
        }
      });
    }

    function deleteItemHistorial(item){

    }

    function cancel(){
      $mdDialog.hide();
      //$mdDialog.hide('cerrado');
    }

  });
