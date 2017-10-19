'use strict';





angular.module('myApp.services', []).
value('version', '0.1')
//declare expense categories
    .value('categoryList', ["Food", "Transportation", "Fees", "Equipment", "Misc"])
    .factory('expService', [
        function() {
            var prefix = 'exp-mgr';
            return {
                saveExpense: function(data) {
                    var timeStamp = Math.round(new Date().getTime());
                    var key = prefix + timeStamp;
                 //   data.date = timeStamp;
                    data = JSON.stringify(data);
              //saves data as a key/value pair in localstorage with the date/time as key
                    localStorage[key] = data;
                },

                getExpense: function() {
                    var expenses = [];
                    var prefixLength = prefix.length;
                    Object.keys(localStorage)
                        .forEach(function(key) {
                            if (key.substring(0, prefixLength) == prefix) {
                                var item = window.localStorage[key];
                                item = JSON.parse(item);
                                item.key=key;
                                expenses.push(item);
                            }
                        });

                    return expenses;
                },
                getCategoryTotal: function(category) {
  var categoryTotal = 0;
  var prefixLength = prefix.length;
  Object.keys(localStorage)
    .forEach(function(key) {
      if (key.substring(0, prefixLength) == prefix) {
        var item = localStorage[key];
        item = JSON.parse(item);
        if (item.category == category) {
          categoryTotal += parseFloat(item.amount);
        }

      }

    });
  return categoryTotal;
}


            };
        }
    ]);
