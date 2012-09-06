if (window.jQuery && jQuery.noConflict && (typeof $('body') == 'object')) {
	jQuery.noConflict();

	/**
	 * gt tabs plugin
	 */
	(function($) { 
				$.fn.gtContentTabs = function (_options){
					return this.each( function() {		
						var container = $( this );
						new $.gtContentTabs().setup( this, container );
					} );
				}
				 $.gtContentTabs = function() { 
					var self = this;
					this.lastTab = null;
					this.nextTab=null;
					this.setup=function( obj, o ){
						var contentTabs = o.children( 'div.gt-tab-content' );
						var nav = o.children( 'ul.gt-tab-navigator' );
						contentTabs.children('div').hide();
						nav.children('li:first').addClass('first').addClass( 'active' );	
						contentTabs.children('div:first').show();
						
						nav.children('li').children('a').click( function() {
							self.lastTab = 	nav.children('li.active').children('a').attr('href');										
							nav.children('li.active').removeClass('active')											
							$(this).parent().addClass('active');
							var currentTab = $(this).attr('href'); 
							self.tabActive( contentTabs, currentTab );		
							return false;
						});	
					};
					this.tabActive=function( contentTabs,  currentTab ){
						if(  this.lastTab != currentTab ){
							contentTabs.children( this.lastTab ).hide();	
						}
			
						contentTabs.children( currentTab ).show();
					};
				};
			})(jQuery);
}
function switchFontSize (ckname,val){
	var bd = $$('body')[0];
	switch (val) {
		case 'inc':
		if (CurrentFontSize+1 < 7) {
			bd.removeClassName('fs'+CurrentFontSize);
			CurrentFontSize++;
			bd.addClassName('fs'+CurrentFontSize);
		}
		break;
		case 'dec':
		if (CurrentFontSize-1 > 0) {
			bd.removeClassName('fs'+CurrentFontSize);
			CurrentFontSize--;
			bd.addClassName('fs'+CurrentFontSize);
		}
		break;
		default:
		bd.removeClassName('fs'+CurrentFontSize);
		CurrentFontSize = val;
		bd.addClassName('fs'+CurrentFontSize);
	}
	createCookie(ckname, CurrentFontSize,365);
}

function switchTool (ckname, val) {
	createCookie(ckname, val, 365);
	window.location.reload();
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ""); };

function menuFistLastItem () {
	if ((menu = $('nav')) && (children = menu.childElements()) && (children.length)) {
		children[0].addClassName ('first');
		children[children.length-1].addClassName ('last');
	}
}

//Add span to module title
/*function addSpanToTitle () {
	//var colobj = document.getElementById ('gt-col');
	//if (!colobj) return;
	var modules = $$('.block-title strong span');
	if (!modules) return;
	modules.each (function(title){
		var html = title.innerHTML;
		var text = html.stripTags();
		var pos = text.indexOf(' ');
		if (pos!=-1) {
			text = text.substr(0,pos);
		}
		title.update(html.replace(new RegExp (text), '<span class="first-word">'+text+'</span>'));
	});
}*/


//Add span to page title
function addSpanToPageTitle () {
	var pages = $$('.page-title h1');
	if (!pages) return;
	pages.each (function(page){
		var html = page.innerHTML;
		var text = html.stripTags();
	//	page.update(html.replace(new RegExp (text), '<span>'+text+'</span>'));
	jQuery(pages).html('<span>'+text+'</span>');
	});
}

//Add hover event for li - hack for IE6
function navMouseHover () {
	var lis = $$('#nav li');
	if (lis && lis.length) {
		lis.each (function(li){
			li.onMouseover = toggleMenu (li, 1);
			li.onMouseout = toggleMenu (li, 0);
		});
	}
}

toggleMenu = function (el, over) {
	  var iS = false;
    if (Element.childElements(el) && Element.childElements(el).length > 1) {
	    var uL = Element.childElements(el)[1];
			iS = true;
		}
    if (over) {
        Element.addClassName(el, 'over');
				Element.addClassName (el.down('a'), 'over');
        if(iS){ uL.addClassName('shown-sub')};
    }
    else {
        Element.removeClassName(el, 'over');
				Element.removeClassName (el.down('a'), 'over');
        if(iS){ uL.removeClassName('shown-sub')};
    }
}

function makeEqualHeight(divs, offset) {
	if (!offset) offset = 0;
	if(!divs || divs.length < 2) return;
	var maxh = 0;
	divs.each(function(el){
		var ch = el.getHeight();
		maxh = (maxh < ch) ? ch : maxh;
	});
	maxh += offset;
	divs.each(function(el){
		el.setStyle({height: (maxh-parseInt(el.getStyle('padding-top'))-parseInt(el.getStyle('padding-bottom'))) + 'px'});
	});
}

function displayChildMenu(id){
	jQuery("#"+'child_menu'+id).css("display", "block");

	if ( jQuery("#"+'parent_menu'+id).attr("class").indexOf("active") < 0 ) 
		jQuery("#"+'parent_menu'+id).addClass("over");
}

function hideAllMenu(){
	menu = jQuery("[id*=child_menu]");
	
	jQuery.each(menu, function(){
		jQuery("#"+this.id).css("display", "none");
		jQuery("#parent_menu" + this.id.replace("child_menu", "") ).removeClass("over");
	});
}

function rollbackCurrentMenu(){
	hideAllMenu();
	jQuery("[rel=active_menu]").css("display", "block");
}


Varien.Tabs = Class.create();
Varien.Tabs.prototype = {
	initialize: function(selector) {
	var self=this;
	$$(selector+' a').each(this.initTab.bind(this));
},

initTab: function(el) {
	el.href = 'javascript:void(0)';
	if ($(el.parentNode).hasClassName('active')) {
	this.showContent(el);
}
el.observe('click', this.showContent.bind(this, el));
},
showContent: function(a) {
var li = $(a.parentNode), ul = $(li.parentNode);
ul.select('li').each(function(el){
var contents = $(el.id+'_contents');
if (el==li) {
el.addClassName('active');
contents.show();
} else {
el.removeClassName('active');
contents.hide();
}
});
}
}

document.observe("dom:loaded", function() {   
	// initially hide all containers for tab content $$('div.tabcontent').invoke('hide'); 
	//menuFistLastItem();
	//navMouseHover();
	//addSpanToPageTitle();
	//addSpanToTitle();
	//makeEqualHeight($$('.botsl .col'));
	//new Varien.Tabs('.tabs');
}); 

jQuery(document).ready(function() {
    jQuery(".tabs").tabs(".tabs-panes .pane", {rotate: false});

    
	jQuery('.header').append('<div id="top">Back to Top</div>');
	
	jQuery(window).scroll(function() {
	if(jQuery(window).scrollTop() != 0) {
		jQuery('#top').fadeIn();
	} else {
      jQuery('#top').fadeOut();
   }
   });
   jQuery('#top').click(function() {
        jQuery('html, body').animate({scrollTop:0},500);
   });

});

(function($){
    $(function(){
        //sub menu items
        var activeItem = $("#nav > li.active > ul");
        if ( activeItem.length ) {
            activeItem
                    .clone()
                    .find("ul").remove().end()
                    .prop("id", "sub_cat")
                    .prependTo(".main-container .main");
        }
    });
}(jQuery));