(function() {
  'use strict';

  angular
  .module('templatesData', [])
  .factory('templatesData', templatesData);

  /* @ngInject */
  function templatesData($http) {
    var service = {
      query: query,
      create: create,
      getById: getById,
      updateById: updateById,
      deleteById: deleteById
    };
    return service;

    ////////////////

    function query() {
      return $http.get('/api/champions');
    }
    function create(data) {
      return $http.post('/api/champions', data);
    }
    function getById(id) {
      return $http.get('/api/champions/id' + id);
    }
    function updateById(id, data) {
      return $http.put('/api/champions/id' + id, data);
    }
    function deleteById(id) {
      return $http.delete('/api/champions/id' + id);
    }
  }
})();