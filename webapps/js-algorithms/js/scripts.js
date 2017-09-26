


  function translatePigLatin() {
var str = document.getElementById("pigLatinText").value;
         str=str.toLowerCase();
      var arrayOfWords = str.split(" ");
      for(i=0;arrayOfWords.length>i;i++){
         var n = arrayOfWords[i].search(/[aeiuo]/);
         switch (n){
           case 0: arrayOfWords[i] = arrayOfWords[i]+"way"; break;
           case -1: arrayOfWords[i] = arrayOfWords[i]+"ay"; break;
           default :
             //str= str.substr(n)+str.substr(0,n)+"ay";
             arrayOfWords[i] = arrayOfWords[i].replace(/([^aeiou]*)([aeiou])(\w+)/, "$2$3$1ay");
           break;
        }
    }
      var pigLatinString = arrayOfWords.join(" ");
       document.getElementById('pigLatin').innerHTML = "<strong>Your Result: </strong>"+pigLatinString;

    }

    function resetPigLatin(){
      document.getElementById("pigLatinText").value = "";
      document.getElementById('pigLatin').innerHTML = "";
    }



    function makeFizzBuzz() {
      var entry = document.getElementById("fizzBuzzText").value;
    var valid = /\d\,\d/;
    if (!valid.test(entry)){
      document.getElementById('fizzbuzz').innerHTML =  "Please enter two numbers, between 1 and 20, separated by a comma."; return;}
    var splitEntry = entry.split(",");

    var listOfNumbers = "";

    for (i=0;2>i;i++){
    splitEntry[i] = parseInt(splitEntry[i], 10);
    }
    for (i = 1; 101 >i; i++) {
        output = "";
    if ((i % splitEntry[0]) === 0 && (i % splitEntry[1]) === 0)
        output = "FizzBuzz";
      else if ((i % splitEntry[0]) === 0)
        output = "Fizz";
      else if ((i % splitEntry[1]) === 0)
        output = "Buzz";
      else
        output = i;
    listOfNumbers += output + "  ";
              }
      document.getElementById('fizzbuzz').innerHTML =  "<strong>Your Result: </strong>"+listOfNumbers;
    }

    function resetFizzBuzz(){
      document.getElementById("fizzBuzzText").value = "";
      document.getElementById('fizzbuzz').innerHTML = "";
    }


    function testPalindrome(){
var str = document.getElementById("palindromeText").value;
    if(str.toLowerCase() == str.toLowerCase().split("").reverse().join("")){
      document.getElementById('palindrome').innerHTML = "<strong>Your Result: </strong> Yes, this is a palindrome";
    }
    else{document.getElementById('palindrome').innerHTML = "<strong>Your Result: </strong> Nope, not a palindrome!";}
    }

    function resetPalindrome(){
      document.getElementById("palindromeText").value = "";
      document.getElementById('palindrome').innerHTML = "";
    }
