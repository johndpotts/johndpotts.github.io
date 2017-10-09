'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('HomeCtrl', ['$scope',
        function($scope) {

        }
    ])
    .controller('AddExpenseCtrl', ['$scope', 'categoryList', 'expService',
        function($scope, categoryList, expService) {
            $scope.categories = categoryList;
            $scope.submit = function() {
                expService.saveExpense($scope.expense);
            };
        }
    ])
    .controller('ViewSummaryCtrl', ['$scope', 'expService', 'categoryList',
        function($scope, expService, categoryList) {
            $scope.expenses = expService.getExpense();

            $scope.summaryData = [];
            var categories = categoryList;
            categories
                .forEach(function(item) {
                    var catTotal = expService.getCategoryTotal(item);
                    $scope.summaryData.push({
                        category: item,
                        amount: catTotal
                    });
                });

        }
    ])

.controller('NavigationCtrl', ['$scope', '$location',
    function($scope, $location) {
        var navigator = function(incrementer) {
            $scope.slidingDirection = (incrementer === 1) ? 'slide-right' : 'slide-left';
            var pages = ['/', '/add-expense', '/view-summary'];
            var nextUrl = "";
            var currentPage = $location.path();
            var lastPageIndex = pages.length - 1;
            var pageIndex = pages.indexOf(currentPage);
            var direction = pageIndex + incrementer;
            if (direction === -1) direction = lastPageIndex;
            if (direction > lastPageIndex) direction = 0;
            nextUrl = pages[direction];
            $location.url(nextUrl);
        };
        $scope.goLeft = function() {
            navigator(-1);
        };
        $scope.goRight = function() {
            navigator(1);
        };
    }
]);
