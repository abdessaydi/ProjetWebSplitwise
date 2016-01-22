
(function() {
    'use strict';

    angular.module('services')
    .factory('BillResource', ['$resource', function($resource){

        var billResource =  $resource('/api/bill/:firstname', {}, {
            getAll : {method:'GET', isArray:true},
            get : {method:'GET'},
            add : {method:'POST'},
            delete : {method:'DELETE'},
            update : {method : 'PUT'}
        })

        return   {
            getAll: function(){
                return billResource.getAll()
            },
            
            add: function(bill){
                billResource.add(bill)
            },
            
            remove: function(billId){
                return billResource.delete({id : billId})
            },

            update: function(bill){
                billResource.update(bill)
            }
        }
    }])

})();