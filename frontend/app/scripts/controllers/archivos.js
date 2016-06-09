'use strict';

/**
 * @ngdoc function
 * @name futbolappApp.controller:ArchivosCtrl
 * @description
 * # ArchivosCtrl
 * Controller of the futbolappApp
 */
angular.module('futbolappApp')
  .controller('ArchivosCtrl', function ($mdDialog, Connect, item, modelname) {
    var
      vm = this,
      Model = new Connect('archivo'),
      criteria = {}
    ;
    if(!item || !item.id){
      $mdDialog.hide();
    }

    vm.list = [];
    vm.file = [];
    vm.title = null;
    vm.titulo = 'Manejador de Archivos';
    vm.cancel = cancel;
    vm.uploadFiles = uploadFiles;
    vm.addToUpload = addToUpload;
    vm.addAvatar = addAvatar;
    vm.deleteFile = deleteFile;

    criteria[modelname] = item.id;

    Model.find(criteria).then(function(list){
      list = list.map(function(itemlist){
        itemlist.avatar = item.avatar === itemlist.id;
        return itemlist;
      });
      vm.list = list;
    });

    function cancel(){
      $mdDialog.hide();
      //$mdDialog.hide('cerrado');
    }

    function uploadFiles(){
      //console.log(vm.file)
      if(vm.file.length > 0){
        var name = vm.file[0].name.split('.');
        Model.upload(vm.file, vm.title + '.' + name[1], item.id, modelname)
          .then(function (archivo){
            vm.list.push(archivo);
            vm.file = [];
          });
        /*vm.list = vm.file.map(function(file){
          return file;
        });*/
      }
    }

    function addToUpload(){
      /*vm.title = vm.file.map(function(file, index){
        if(vm.title[index]){
          return vm.title[index];
        }
        var name = file.name.split('.');
        return name[0];
      });*/
      //console.log(vm.file)
      var name = vm.file[0].name.split('.');
      vm.title = name[0];
    }

    function addAvatar(file){
      item.avatar = file.id;
      var ele = new Connect(modelname);
      var tmp = {};
      angular.forEach(item, function(val, key){
        if(key === 'avatar' || !angular.isArray(val)){
          tmp[key] = val;
        }
      });
      ele.update(tmp).then(function(){
        vm.list = vm.list.map(function(itemlist){
          itemlist.avatar = item.avatar === itemlist.id;
          return itemlist;
        });
      });
    }

    function deleteFile($event,file){
      if($event){
        $event.preventDefault();
        $event.stopPropagation();
      }
      Model.remove(file).then(function(){
        vm.list = vm.list.filter(function(itemlist){
          return itemlist.id !== file.id;
        });
      });
    }

  });
