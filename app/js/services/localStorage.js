app.service('localStorage', ['$window', function($window){

  var StorageAbstract = function(){}; 
 
 
  StorageAbstract.prototype = { 
    getImplementation: function(){ 
      throw new Error('getImplementation method is required'); 
    }, 
    put: function(key, value){ 
      var stringify = JSON.stringify(value); 
      try{ 
        this.getImplementation().setItem(key, stringify);
        console.log(this.getImplementation.getItem(key)); 
        return true; 
      }catch(e){ 
        console.log(e); 
        return false; 
      } 
    }, 
    get: function(key){ 
      try{ 
        return JSON.parse(this.getImplementation().getItem(key)); 
      }catch(e){ 
        console.log(e); 
      } 
    }, 
    has: function(key){ 
      return this.getImplementation().hasOwnProperty(key); 
    }, 
    remove: function(key){ 
      this.getImplementation.removeItem(key); 
    }, 
    clear: function(){ 
      this.getImplementation.clear(); 
    }, 
    keys: function(){ 
      var keys = [], impl = this.getImplementation(); 
      for(var i=0; i<impl.length; i++){ 
        keys.push(impl.key(i)); 
      } 
      return keys; 
    } 
  }; 



  var $localStorage = function(){}; 
  $localStorage.prototype = new StorageAbstract(); 
  $localStorage.prototype.getImplementation = function(){ 
    return $window.localStorage; 
  } 
  return new $localStorage();
  
}]);