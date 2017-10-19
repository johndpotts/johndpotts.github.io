'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('HomeCtrl', function() {})

.controller('AddExpenseCtrl', ['$scope', 'categoryList','expService',function($scope, categoryList,expService) {
        $scope.categories = categoryList;
            $scope.submit = function() {
            expService.saveExpense($scope.expense);
  $scope.addForm.$setPristine();
    this.expense.category=null;
    this.expense.description=null;
    this.expense.amount=null;
    };

    }
])
  .controller('ViewSummaryCtrl', ['$scope','expService','categoryList',function($scope,expService,categoryList) {
      $scope.expenses = expService.getExpense();
      $scope.summaryData = [];

$scope.clearExpenses = function(){
  if (confirm('Are you sure you want to delete all your expenses?')){
  window.localStorage.clear();
  location.reload();
}
};

$scope.deleteItem = function(key){
if (confirm('Are you sure you want to delete this expense?')){
  localStorage.removeItem(key);
location.reload();
}
};
categoryList.forEach(function(item) {
        var catTotal = expService.getCategoryTotal(item);
        $scope.summaryData.push({
            category: item,
            amount: catTotal
        });

    });


    }
  ])
  .controller('NavigationCtrl',['$scope','$location',function($scope,$location){



var navigator=function(incrementer){
var pages=['/','/add-expense','/view-summary'];

  	var nextUrl="";
  	var currentPage = $location.path();
var lastPageIndex= pages.length-1;
  	var pageIndex= pages.indexOf(currentPage);


var direction= pageIndex+incrementer;
if(direction===-1)direction=lastPageIndex;
if(direction>lastPageIndex)incrementer=0;
nextUrl=pages[direction];
$location.url(nextUrl);

$scope.direction=(incrementer===1)?'slide-right':'slide-left';

};

  	$scope.goLeft=function(){
  		navigator(-1);
};


$scope.goRight=function(){

navigator(1);


  	};

  }]);
