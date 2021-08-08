var _listeners = {};
var Emitter = {
  add: function (event, callback) {
    if (!_listeners[event]) _listeners[event] = [];
    var container = _listeners[event];
    container.push(callback);
    return function () {
      var index = container.findIndex(function (c) {
        return c === callback;
      });

      if (index > -1) {
        container.splice(index, 1);
        return true;
      }

      return false;
    };
  },
  emit: function (event) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    return (_listeners[event] || []).forEach(function (callback) {
      return callback.apply(void 0, args);
    });
  }
};
export default Emitter;