(function($){
   var regexp = /[\n\r\s](ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/g;
   var htmlizeLinks = function(string){
     var matches = string.match(regexp);
     if (!matches){
       return string;
     }
     var newStr = string;
     for (var i=0, ln=matches.length; i<ln; i++ ){
       var match = matches[i].substring(1);
       newStr=newStr.replace(match, '<a href="'+match+'" target="_blank">' + match+'</a>');
     }
     return newStr;
   };
   $.fn.linkeditor=function(){
     this.each(function(){
		 var $this = $(this);
		 var doc = this.contentWindow.document;
		 doc.designMode = 'on';
		 var $db = $(doc.body);
		 $(doc).blur(
		   function(){
		     $db.html(htmlizeLinks($db.html()));
	   	     $db.find('a').click(function(e){
					   window.open($(this).attr('href'));
					   e.stopPropagation();
					   return false;
					 });
		     doc.designMode = 'off';
		   });
		 $(doc).focus(function(){
				doc.designMode = 'on';
			      });
	       });
   };
 })(jQuery);