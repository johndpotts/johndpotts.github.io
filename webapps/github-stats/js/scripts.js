
function gitHubStats(){
//clear out previous entry
document.getElementById('chart').innerHTML = "<i class='fa fa-cog fa-spin fa-4x fa-fw'></i><span class='sr-only'>Loading...</span><h4>Retrieving stats from Github</h4>"

  //set the user language object
  var userLanguages = {};
  //set the username
  var userName = document.getElementById("username").value;

  document.getElementById('title').innerHTML = "Github Language Percentage for " + userName;


  document.getElementById('graph-title').innerHTML ="This graph shows the overall language composition of all of a user's repositories.";
  //make url for username
  var URL = "https://api.github.com/search/repositories?q=user:"+userName;

  var allTheUserRepos = [];

  $.getJSON(URL, function(data){
     var repos = data.items;
  for (i=0;i<repos.length;i++){
   allTheUserRepos.push(repos[i]["languages_url"]);
                 }


     var fetchJSON = function(url) {
  return new Promise((resolve, reject) => {
    $.getJSON(url)
      .done((json) => resolve(json))
      .fail((xhr, status, err) => reject(status + err.message));
  });
}
 var urlPromises = allTheUserRepos.map(fetchJSON);

       Promise.all(urlPromises)
  .then(function(results) {
     // we only get here if ALL promises fulfill
     results.forEach(function(langdata) {
         for (var language in langdata){

           if(userLanguages.hasOwnProperty(language)){
             userLanguages[language] =  userLanguages[language]+langdata[language];
                      }
           else{

             userLanguages[language]=langdata[language];
           }


         }

     })

         var totalLinesOfCode = 0;
         var dataset = []
         for (lang in userLanguages){
          totalLinesOfCode += userLanguages[lang]
                    }
         var counter = 0
         document.getElementById('totalLinesOfCode').innerHTML = "This user's repos include a total of  " + totalLinesOfCode + " lines of code.";
        for (lang in userLanguages){

         dataset[counter]={}
          dataset[counter]["label"]=lang;
          dataset[counter]["count"]=Math.round((userLanguages[lang]/totalLinesOfCode)*10000)/100;
          counter++
        }
         console.log(dataset);

(function(d3) {
        'use strict';


        var width = 360;
        var height = 360;
        var radius = Math.min(width, height) / 2;
        var donutWidth = 75;
        var legendRectSize = 18;                                  // NEW
        var legendSpacing = 4;                                    // NEW

        //var color = d3.scaleOrdinal(d3.schemeCategory20b);
 var color = d3.scaleOrdinal().domain(["1C Enterprise","ABAP","ActionScript","Ada","Agda","AGS Script","Alloy","Alpine Abuild","AMPL","ANTLR","Apex","API Blueprint","APL","Apollo Guidance Computer","AppleScript","Arc","Arduino","ASP","AspectJ","Assembly","ATS","Augeas","AutoHotkey","AutoIt","Awk","Ballerina","Batchfile","Befunge","Bison","BitBake","BlitzBasic","BlitzMax","Bluespec","Boo","Brainfuck","Brightscript","Bro","C","C#","C++","C2hs Haskell","Cap'n Proto","CartoCSS","Ceylon","Chapel","Charity","ChucK","Cirru","Clarion","Clean","Click","CLIPS","Clojure","CMake","COBOL","CoffeeScript","ColdFusion","ColdFusion CFC","Common Lisp","Component Pascal","Cool","Coq","Crystal","Csound","Csound Document","Csound Score","CSS","Cuda","CWeb","Cycript","Cython","D","Dart","DataWeave","DIGITAL Command Language","DM","Dogescript","DTrace","Dylan","E","eC","ECL","ECLiPSe","Eiffel","Elixir","Elm","Emacs Lisp","EmberScript","EQ","Erlang","F#","Factor","Fancy","Fantom","Filebench WML","Filterscript","fish","FLUX","Forth","Fortran","FreeMarker","Frege","Game Maker Language","GAMS","GAP","GCC Machine Description","GDB","GDScript","Genie","Genshi","Gentoo Ebuild","Gentoo Eclass","Gherkin","GLSL","Glyph","Gnuplot","Go","Golo","Gosu","Grace","Grammatical Framework","Groovy","Groovy Server Pages","Hack","Harbour","Haskell","Haxe","HCL","HLSL","HTML","Hy","HyPhy","IDL","Idris","IGOR Pro","Inform 7","Inno Setup","Io","Ioke","Isabelle","Isabelle ROOT","J","Jasmin","Java","Java Server Pages","JavaScript","JFlex","Jison","Jison Lex","Jolie","JSONiq","JSX","Julia","Jupyter Notebook","Kotlin","KRL","LabVIEW","Lasso","Lean","Lex","LFE","LilyPond","Limbo","Literate Agda","Literate CoffeeScript","Literate Haskell","LiveScript","LLVM","Logos","Logtalk","LOLCODE","LookML","LoomScript","LSL","Lua","M","M4","M4Sugar","Makefile","Mako","Mask","Mathematica","Matlab","Max","MAXScript","Mercury","Meson","Metal","MiniD","Mirah","Modelica","Modula-2","Module Management System","Monkey","Moocode","MoonScript","MQL4","MQL5","MTML","MUF","mupad","Myghty","NCL","Nearley","Nemerle","nesC","NetLinx","NetLinx+ERB","NetLogo","NewLisp","Nim","Nit","Nix","NSIS","Nu","NumPy","Objective-C","Objective-C++","Objective-J","OCaml","Omgrofl","ooc","Opa","Opal","OpenCL","OpenEdge ABL","OpenRC runscript","OpenSCAD","Ox","Oxygene","Oz","P4","Pan","Papyrus","Parrot","Parrot Assembly","Parrot Internal Representation","Pascal","PAWN","Pep8","Perl","Perl 6","PHP","PicoLisp","PigLatin","Pike","PLpgSQL","PLSQL","PogoScript","Pony","PostScript","POV-Ray SDL","PowerBuilder","PowerShell","Processing","Prolog","Propeller Spin","Puppet","PureBasic","PureScript","Python","Python console","QMake","QML","R","Racket","Ragel","RAML","Rascal","REALbasic","Reason","Rebol","Red","Redcode","Ren'Py","RenderScript","REXX","Ring","RobotFramework","Roff","Rouge","Ruby","RUNOFF","Rust","Sage","SaltStack","SAS","Scala","Scheme","Scilab","Self","ShaderLab","Shell","ShellSession","Shen","Slash","Smali","Smalltalk","Smarty","SMT","SourcePawn","SQF","SQLPL","Squirrel","SRecode Template","Stan","Standard ML","Stata","SuperCollider","Swift","SystemVerilog","Tcl","Tcsh","Terra","TeX","Thrift","TI Program","TLA","Turing","TXL","TypeScript","Unified Parallel C","Unix Assembly","Uno","UnrealScript","UrWeb","Vala","VCL","Verilog","VHDL","Vim script","Visual Basic","Volt","Vue","WebAssembly","WebIDL","wisp","X10","xBase","XC","Xojo","XProc","XQuery","XS","XSLT","Xtend","Yacc","Zephir","Zimpl"]).range(["#814CCC","#E8274B","#882B0F","#02f88c","#315665","#B9D9FF","#64C800","null","#E6EFBB","#9DC3FF","null","#2ACCA8","#5A8164","null","#101F1F","#aa2afe","#bd79d1","#6a40fd","#a957b0","#6E4C13","#1ac620","null","#6594b9","#1C3552","null","#FF5000","#C1F12E","null","null","null","null","#cd6400","null","#d4bec1","#2F2530","null","null","#555555","#178600","#f34b7d","null","null","null","#dfa535","#8dc63f","null","null","#ccccff","#db901e","#3F85AF","#E4E6F3","null","#db5855","null","null","#244776","#ed2cd6","null","#3fb68b","#B0CE4E","null","null","#776791","null","null","null","#563d7c","#3A4E3A","null","null","null","#ba595e","#00B4AB","#003a52","null","#447265","#cca760","null","#6c616e","#ccce35","#913960","#8a1267","null","#946d57","#6e4a7e","#60B5CC","#c065db","#FFF4F3","#a78649","#B83998","#b845fc","#636746","#7b9db4","#14253c","null","null","null","#88ccff","#341708","#4d41b1","#0050b2","#00cafe","#8fb200","null","null","null","null","null","#fb855d","null","null","null","#5B2063","null","#e4cc98","#f0a9f0","#375eab","#88562A","#82937f","null","#79aa7a","#e69f56","null","#878787","#0e60e3","#5e5086","#df7900","null","null","#e34c26","#7790B2","null","#a3522f","null","null","null","null","#a9188d","#078193","#FEFE00","null","#9EEDFF","null","#b07219","null","#f1e05a","null","null","null","#843179","#40d47e","null","#a270ba","#DA5B0B","#F18E33","#28431f","null","#999999","null","#DBCA00","null","null","null","null","null","null","#499886","#185619","null","null","#cc9900","#652B81","null","#3d9970","#000080","null","null","null","#427819","null","#f97732","null","#e16737","#c4a79c","#00a6a6","#ff2b2b","#007800","#8f14e9","null","#c7a938","null","null","null","null","null","null","#62A8D6","#4A76B8","#b7e1f4","null","null","null","#28431f","#990000","#3d3c6e","#94B0C7","#0aa0ff","#747faa","#ff6375","#87AED7","#37775b","#009917","#7e7eff","null","#c9df40","null","#438eff","#6866fb","#ff0c5a","#3be133","#cabbff","#b0b77e","null","#f7ede0","null","null","null","null","null","#cdd0e3","#fab738","#7055b5","#cc0000","#6600cc","#f3ca0a","null","null","#E3F171","#dbb284","#C76F5B","#0298c3","#0000fb","#4F5D95","null","#fcd7de","#005390","null","#dad8d8","#d80074","null","#da291c","null","#8f0f8d","#012456","#0096D8","#74283c","#7fa2a7","#302B6D","#5a6986","#1D222D","#3572A5","null","null","#44a51c","#198CE7","#22228f","#9d5200","#77d9fb","#fffaa0","null","null","#358a5b","#f50000","null","#ff7f7f","null","null","#0e60e3","null","#ecdebe","#cc0088","#701516","#665a4e","#dea584","null","#646464","#B34936","#c22d40","#1e4aec","null","#0579aa","null","#89e051","null","#120F14","#007eff","null","#596706","null","null","#5c7611","#3F3F3F","null","#800000","#348a34","#b2011d","#dc566d","null","#46390b","#ffac45","#DAE1C2","#e4cc98","null","#00004c","#3D6117","null","#A0AA87","null","#cf142b","null","#2b7489","null","null","null","#a54c4d","null","#fbe5cd","null","#b2b7f8","#adb2cb","#199f4b","#945db7","#1F1F1F","#2c3e50","#04133b","null","#7582D1","#4B6BEF","#403a40","#99DA07","null","null","#5232e7","null","#EB8CEB","null","#4B6C4B","#118f9e","null"]);

document.getElementById('chart').innerHTML = ""
        var svg = d3.select('#chart')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + (width / 2) +
            ',' + (height / 2) + ')');

        var arc = d3.arc()
          .innerRadius(radius - donutWidth)
          .outerRadius(radius);

        var pie = d3.pie()
          .value(function(d) { return d.count; })
          .sort(null);

        var path = svg.selectAll('path')
          .data(pie(dataset))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', function(d, i) {
            return color(d.data.label);
          });



        var legend = svg.selectAll('.legend')                     // NEW


        .data(dataset).enter()                                                // NEW
          .append('g')                                            // NEW
          .attr('class', 'legend')                                // NEW
          .attr('transform', function(d, i) {                     // NEW
            var height = legendRectSize + legendSpacing;          // NEW
            var offset =  height * dataset.length / 2;     // NEW
            var horz = -2 * legendRectSize;                       // NEW
            var vert = i * height - offset;                       // NEW
            return 'translate(' + horz + ',' + vert + ')';        // NEW
          });                                                     // NEW

        legend.append('rect')                                     // NEW
          .attr('width', legendRectSize)                          // NEW
          .attr('height', legendRectSize)                         // NEW
          .style('fill', function(d, i) {
            return color(d.label);})                                   // NEW
          .style('stroke', function(d, i) {
            return color(d.label);});                                // NEW

        legend.append('text')                                     // NEW
          .attr('x', legendRectSize + legendSpacing)              // NEW
          .attr('y', legendRectSize - legendSpacing)              // NEW
          .text(function(d) { return d.label; });                       // NEW

      })(window.d3);
















  })
  .catch(function(err) {
    // Will catch failure of first failed promise
    console.log("Failed:", err);
  });







       }).fail(function( jqxhr, textStatus, error ) {
    document.getElementById('graph-title').innerHTML = 'Sorry, we were not able to obtain data for the github user "' +userName +'"'
});;//first getJSON

} //gitHubStats function
//setTimeout(function(){console.log(userLanguages)}, 5000)
