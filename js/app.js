'use strict';

var app = angular.module('overviewApp',[]);
    app.controller('overviewCtrl',function($scope){
        $scope.items = [];
        $scope.readItem = function(){
            var retriveData = window.localStorage["itemName"];
            if(!retriveData){
                return $scope.items = [];
            }else{
                return $scope.items = JSON.parse(retriveData);
            };
            return $scope.items;
        };
        $scope.readItem();
        
        $scope.addItem = function(){
            $scope.currentId = function(){
                if($scope.items.length == 0){
                    return 0;
                }else{
                    return $scope.items[$scope.items.length - 1].id + 1;
                }
            };
            if($scope.itemName){
                $scope.item = {
                    id : $scope.currentId(),
                    name : $scope.itemName,
                    comment : []
                }
                $scope.items.push($scope.item);
                $scope.itemName = null;
                $scope.updateItem();
            }
        };
        
        $scope.updateItem = function(){
            window.localStorage["itemName"] = JSON.stringify($scope.items, function(key,val){
                if(key ==='$$hashKey'){
                    return undefined;
                }else{
                    return val;
                }
            });
            
        };
        
        $scope.selectedItem = function(el){
            $scope.uniqueId = el.id;
            $scope.loadComment = true;
            
            
            
            $scope.retrive = $scope.retriveComment();
            console.log($scope.retrive)
        };
        
        $scope.getItemById = function(id){
            $scope.retriveItem = $scope.items.filter(function(obj){
                return obj.id == id;
            });
            return $scope.retriveItem;
        };
        
        $scope.removeItem = function(index){
            $scope.items.splice(index, 1);
            $scope.updateItem();
        }
        
        $scope.addComment = function(event){
            if(event.keyCode === 13){
                $scope.itemObj = $scope.getItemById($scope.uniqueId);
                $scope.newComment = {
                    massage : $scope.massageComment
                }
                $scope.itemObj[0].comment.push($scope.newComment);
                
                $scope.massageComment = null;
                $scope.updateItem(); 
            };
               
        };
        $scope.retriveComment = function(){
            $scope.itemObj = $scope.getItemById($scope.uniqueId);
            return $scope.itemObj[0].comment;
        };
        
        
        
    });