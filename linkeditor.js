(function($){
   var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/g;
   var htmlizeLinks = function(string){
     var matches = string.match(regexp);
     if (!matches){
       return string;
     }
     var newStr = string;
     alert(matches.length);
     for (var i=0, ln=matches.length; i<ln; i++ ){
       var match = matches[i];
       newStr=newStr.replace(match, '<a href="'+match+'">' + match+'</a>');
     }
     alert(newStr);
     return newStr;
   };
   $.fn.linkeditor=function(){
     this.each(function(){
		 var $this = $(this);
		 var doc = this.contentWindow.document;
		 doc.designMode = 'on';
		 doc.contentEditable = 'true';
		 var $db = $(doc.body);
		 setInterval(function(){
		   $db.html(htmlizeLinks($db.html()));
		 },5000);

	       });
   };
 })(jQuery);