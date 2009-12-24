(function($){
   var regexp = /[\n\r\s](((ftp|http|https):\/\/)|www\.)(\w+:{0,1}\w*@)?[-A-Za-z0-9\.]+\.[-A-Za-z]+(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/g;
   var htmlizeLinks = function(string){
     var matches = string.match(regexp);
     if (!matches){
       return string;
     }
     var newStr = string;
     for (var i=0, ln=matches.length; i<ln; i++ ){
       var match = matches[i].substring(1);
       var url;
       if (match.search('//')>-1)
	 url = match;
       else
	 url = 'http://' + match;
       newStr=newStr.replace(match, '<a href="'+url+'" target="_blank">' + match+'</a>');
     }
     return newStr;
   };
   $.fn.linkeditor=function(){
     this.each(function(){
		 var $this = $(this);
		 var $editor = $('<iframe src="javascript:;" height="200" width="400"></iframe>').attr('id', $this.attr('id')+'_if');
		 $this.after($editor).hide();

		 $editor.css({
			       'height' : $this.css('height'),
			       'width' : $this.css('width')
			     }
		 );
		 var doc = $editor.get(0).contentWindow.document;
		 doc.designMode = 'on';
		 doc.open();
		 doc.write($this.val());
		 doc.close();
		 doc.contentEditable = 'true';

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