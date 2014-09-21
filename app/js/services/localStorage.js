/*globals app*/
app.service('localStorage', ['$window', function ($window) {
  var StorageAbstract = function () {
    this.getImplementation = function () {
      throw new Error('getImplementation method is required');
    };
    this.put = function (key, value) {
      var stringify = JSON.stringify(value);
      try {
        this.getImplementation().setItem(key, stringify);
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    };
    this.get = function (key) {
      try {
        return JSON.parse(this.getImplementation().getItem(key));
      } catch (e) {
        console.log(e);
      }
    };
    this.has = function (key) {
      return this.getImplementation().hasOwnProperty(key);
    };
    this.remove = function (key) {
      this.getImplementation.removeItem(key);
    };
    this.clear = function () {
      this.getImplementation.clear();
    };
    this.keys = function () {
      var keys = [], impl = this.getImplementation(), i;
      for (i = 0; i < impl.length; i++) {
        keys.push(impl.key(i));
      }
      return keys;
    };
  };

  var LocalStorage = function () {
    this._name = 'localStorage';
  };
  LocalStorage.prototype = new StorageAbstract();
  LocalStorage.prototype.getImplementation = function () {
    return $window.localStorage;
  };
  return new LocalStorage();

}]);