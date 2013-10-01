;(function($) {

    var prefix   = 'illu',
    className    = 'illuHover',
	activeClass  = 'active',
    settings     = {},
    currentTitle = '',
    currentFx    = '',
    shapeWidth   = '',
    shapeHeight  = '',
    currentElem  = '',
    mainSelector = '',
	positionObj  = { 'top' : 0, 'left' : 0 },
	newPositionObj = '';

    var methods = {
        init : function( options ) { 

            settings = $.extend({
                duration   : 300,
                transition : 'linear',
				defaultFx  : 'slideright',
                onComplete : function() {}
            }, options);

            this.each(function(index, el) {
                mainSelector = $(this);

                $(this).addClass(className);
                $(this).illuHover('start');
                if ( settings.onComplete ) settings.onComplete.call( this );
            });

            return this;

        },
        start : function() {
            $(this).find('li').mouseenter(function(event) {
                $(this).illuHover('hoverAnimStart');

                //console.log( 'y - ' + event.pageY + ' || x -' +event.pageX);

            }).mouseleave(function(event) {
                $(this).illuHover('hoverAnimEnd');
            });
        },
        hoverAnimStart : function(){
			$(this).addClass(activeClass);

            currentTitle = $(this).find('img').attr('title');
            shapeWidth   = $(this).width();
            shapeHeight  = $(this).height();
            currentFx    = getFx(this);

            if($(this).find('p').length == 0) $(this).append('<p><span>'+currentTitle+'</span></p>');
            currentElem = $(this).find('p');

            switch(currentFx){

                case 'slideright':
                currentElem.css({ 'left' : '-'+shapeWidth+'px' });
                currentElem.stop().animate({ left: 0 }, settings.duration, settings.transition);
                break;
				
				case 'slideleft':
                currentElem.css({ 'left' : shapeWidth+'px' });
                currentElem.stop().animate({ left: 0 }, settings.duration, settings.transition);
                break;
				
				case 'slidedown':
                currentElem.css({ 'top' : '-'+shapeHeight+'px' });
                currentElem.stop().animate({ top: 0 }, settings.duration, settings.transition);
                break;
				
				case 'slideup':
                currentElem.css({ 'top' : shapeHeight+'px' });
                currentElem.stop().animate({ top: 0 }, settings.duration, settings.transition);
                break;

            }

        },
        hoverAnimEnd : function(){
			var activated = mainSelector.find('.'+activeClass);
			activated.removeClass(activeClass);
			
			var _tempAppend = $(this).find('p');
            switch(currentFx){

                case 'slideright':
                currentElem.stop().animate({ left: -shapeWidth }, settings.duration, settings.transition, function(){ _tempAppend.remove(); });
                break;
				
				case 'slideleft':
                currentElem.stop().animate({ left: shapeWidth }, settings.duration, settings.transition, function(){ _tempAppend.remove(); });
                break;
				
				case 'slidedown':
                currentElem.stop().animate({ top: -shapeHeight }, settings.duration, settings.transition, function(){ _tempAppend.remove(); });
                break;
				
				case 'slideup':
                currentElem.stop().animate({ top: shapeHeight }, settings.duration, settings.transition, function(){ _tempAppend.remove(); });
                break;

            }

        }
    };

    $.fn.illuHover = function( method ) {

        if ( methods[method] ) {
          return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
          return methods.init.apply( this, arguments );
        } else {
          $.error( 'Method ' +  method + ' does not exist on jQuery.boseSlider' );
        } 
        
    }

    function getFx(elem){
		newPositionObj = getPosition(elem);
		
		console.log('previous - top:'+positionObj.top+', left:'+positionObj.left+' | new - top:'+newPositionObj.top+', left:'+newPositionObj.left);
		
		positionObj = newPositionObj;
		return settings.defaultFx;
    }
	
	function getPosition(elem){
		return { 'top' : elem.offset().top, 'left' : elem.offset().left };	
	}
 

}(jQuery));