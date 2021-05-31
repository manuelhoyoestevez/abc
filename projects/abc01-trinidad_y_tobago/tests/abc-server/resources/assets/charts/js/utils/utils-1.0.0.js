
/**
 * Añadir a las cadenas la funcion "isEmpty".
 *
 */
String.prototype.isEmpty = function()
{ return (!this || 0 === this.length); };

/**
 * Añadir a las cadenas la funcion "isNotEmpty".
 *
 */
String.prototype.isNotEmpty = function()
{ return !(!this || 0 === this.length); };

/**
 * Añadir a las cadenas la funcion "trim".
 * 
 */
String.prototype.trim = function()
{ return (this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")); };

/**
 * Añadir a las cadenas la funcion "startsWith".
 * 
 */
String.prototype.startsWith = function(str) 
{ return (this.match("^"+str)==str); };

/**
 * Añadir a las cadenas la funcion "endsWith".
 * 
 */
String.prototype.endsWith = function(str) 
{ return (this.match(str+"$")==str); };

/**
 *  Auto escaping.
 * 
 */
String.prototype.escape = function()
{ return this.replace(/([ #;&,.+*~\':"!^$[\]()=>|\/])/g,'\\$1'); };

/**
 * Replace All.
 * 
 */
//String.prototype.replaceAll = function(str1, str2, ignore) 
//{ return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2); };
String.prototype.replaceAll = function(str1, str2)
{ return this.split(str1).join(str2); };



/** Singleton **/

var Utils = (function() 
{
	/*** private ***/
	
	var _log = false;
	
	
	function log(msg)
	{
		if (_log)
			/*alert(msg);*/
			console.log("[Utils] " + msg);
	}
	
	function getJQueryId(id)
	{
		return ( "#"+id.escape() );
	}
	
	function getObjectById(id)
	{
		return document.getElementById(id);
	}
	
	function getInputs(parentId)
	{
		/*return $( getJQueryId(parentId) ).find("input, textarea, select");*/
		return $( getJQueryId(parentId) ).find(":input");
	}
	
	function isNull(variable)
	{
		/* 	
			Si necesitamos saber si una variable contiene realmente el valor null, 
			hemos de utilizar el operador de identidad (===),
			que no s�lo compara los valores de las variables, sino que tambi�n hace comprobaci�n de tipos
		 */
		
		return (variable === null);
	}
	
	function isUndefined(variable)
	{
		/* 	
			Si necesitamos saber si una variable es de tipo undefined, 
			para ello hemos de utilizar el operador (typeof),
			el cual retorna en formato String, el nombre del tipo de dicha variable
		 */
		
		return (typeof(variable) === "undefined");
	}
	
	function getObjectValue(obj)
	{
		if (obj == null)
			return null;
		
		var type = obj.type;
	    var tag  = obj.tagName.toLowerCase();
	    
	    if (type == 'text' || type == 'password' || type == 'date' || tag == 'textarea')
    	{ 
	    	var value = obj.value.trim();
	    	obj.value = value;
	    	return value;
		}
	    else
	    if (type == 'checkbox' || type == 'radio')
	    	return obj.checked;
	    else
	    if (tag == 'select')
	    	return obj.value;
	    else
	    	return obj.value;
	}
	
	function clearObjectValue(obj)
	{
		if (obj == null)
			return;
		
		var type = obj.type;
	    var tag  = obj.tagName.toLowerCase();
	    
	    if (type == 'checkbox' || type == 'radio')
	    	obj.checked = false;
	    else
	    if (tag == 'select')
	    	obj.selectedIndex = 0;
	    else
	    	obj.value = "";
	}
	
	function setObjectValue(obj, value)
	{
		if (obj == null)
			return;
		
		if (value == null)
		{
			clearObjectValue(obj);
			return;
		}
		
		var type = obj.type;
	    var tag  = obj.tagName.toLowerCase();
	    
	    if (type == 'text' || type == 'password' || type == 'date' || tag == 'textarea')
	    	obj.value = value.trim();
	    else
	    if (type == 'checkbox' || type == 'radio')
	    	obj.checked = value;
	    else
	    if (tag == 'select')
	    	obj.value = value;
	    else
	    	obj.value = value;
	}
	
	
	/*** public ***/
	
	return {
		
		
		getLanguage : function()
		{
			var language = window.navigator.userLanguage || window.navigator.language;
			
			return language.split("-")[0];
		},
	
		
		isFunction : function(f) 
		{
			return $.isFunction(f);
		},
		
		
		exists : function(id) 
		{
			var obj = getObjectById(id);
			return (obj != null);
		},
	
	
		toUpper : function(value)  
		{
			try
			{
				return value.toUpperCase();
			}
			catch(e)
			{
				return value;
			}
		},
	
	
		toLower : function(value) 
		{
			try
			{
				return value.toLowerCase();
			}
			catch(e)
			{
				return value;
			}
		},
	
	
		getValue : function(id)
		{
			var obj = getObjectById(id);
			
			return getObjectValue(obj);
		},
		
		
		clearValue : function(id)
		{
			var obj = getObjectById(id);
			
			clearObjectValue(obj);
		},
		
		
		getUpperValue : function(id) 
		{
			return Utils.toUpper( Utils.getValue(id) );
		},
	
	
		getLowerValue : function(id) 
		{
			return Utils.toLower( Utils.getValue(id) );
		},
		
		
		getInputValues : function(parentId, prefix)
		{
			var values = {};
			
			getInputs(parentId).each(function()
			{
				var obj = $(this).get(0);
				
				var key = prefix ? obj.id.substring( obj.id.indexOf(prefix) + prefix.length ) : obj.id;
				
				values[ key ] = getObjectValue(obj);
			});
			
			return values;
		},
		
		
		getInputUpperValues : function(parentId, prefix)
		{
			var values = {};
			
			getInputs(parentId).each(function()
			{
				var obj = $(this).get(0);
				
				var key = prefix ? obj.id.substring( obj.id.indexOf(prefix) + prefix.length ) : obj.id;
				
				values[ key ] = Utils.toUpper( getObjectValue(obj) );
			});
			
			return values;
		},
		
		
		getInputLowerValues : function(parentId, prefix)
		{
			var values = {};
			
			getInputs(parentId).each(function()
			{
				var obj = $(this).get(0);
				
				var key = prefix ? obj.id.substring( obj.id.indexOf(prefix) + prefix.length ) : obj.id;
				
				values[ key ] = Utils.toLower( getObjectValue(obj) );
			});
			
			return values;
		},
	
	
		setValue : function(id, value)
		{
			var obj = getObjectById(id);
			
			setObjectValue(obj, value);
		},
		
		
		isEmptyValue : function(id)
		{
			var value = Utils.getValue(id);
			
			if (value == null)
				return true;
			
			if (value.length == 0)
				return true;
			
			return false;
		},
		 
		
		isEmptyMap : function(map)
		{
			if (map == null)
				return true;
			else
				return ($.map(map, function(n,i) { return i; }).length == 0);
		},
		
		
		setValues : function(values, prefix)
		{
			if (values == null)
				return;
			
			$.each(values, function(key, value)
			{
				var id = prefix ? prefix+key : key;
				
				Utils.setValue( id, value );
			});
		},

		
		/*
		isEmptyValues : function(values)
		{
			if (values == null)
				return true;
			
			var empty = true;
			
			$.each(values, function(key, value)
			{
				if (value != null  ||  value.length === 0)
					{ empty = false; return false; }
			});
			
			return empty;
		},
		*/
		
		
		setInputValues : function(parentId, values, prefix) 
		{
			if (values == null)
				return;
			
			getInputs(parentId).each(function()
			{
				var obj = $(this).get(0);
				
				var key = prefix ? obj.id.substring( obj.id.indexOf(prefix) + prefix.length ) : obj.id;
				
				setObjectValue(obj, values[key]);
			});
		},
		
		
		clearInputValues : function(parentId)
		{
			getInputs(parentId).each(function()
			{
				var obj = $(this).get(0);
				
				clearObjectValue(obj);
			}); 
		},
	
	
		getAttribute : function(id, attribute)
		{
			return $( getJQueryId(id) ).attr(attribute);
		},
	
	
		setAttribute : function(id, attribute, value)
		{
			if (value != null)
				$( getJQueryId(id) ).attr(attribute, value);
			else
				$( getJQueryId(id) ).removeAttr(attribute);
		},
	
	
		removeAttribute : function(id, attribute)
		{
			Utils.setAttribute(id, attribute, null);
		},
	
	
		setImage : function(id, src, visible)
		{
			Utils.setAttribute(id, 'src', src);
			
			if (visible != null)
				Utils.setVisible(id, visible);
		},
		
		
		setImageB64 : function(id, dataB64, imageType, visible)
		{
			imageType = (imageType) ? ("/"+imageType) : "";
			
			Utils.setAttribute(id, 'src', "data:image" + imageType + ";base64," + dataB64);
			
			if (visible != null)
				Utils.setVisible(id, visible);
		},
		
		
		getImageB64 : function(id)
		{
			var image = document.getElementById(id);
			
			if (image == null)
				return null;
			
			if (image.src.indexOf("data:image") != 0)
				return null;
			
			return image.src.substring( image.src.indexOf(",") + 1 );
		},

		
		setTitle : function(id, title)
		{
			Utils.setAttribute(id, 'title', title);
		},
	
	
		setEnabled : function(id, set)
		{
			if (set == false)
				Utils.setAttribute(id, 'disabled', 'disabled');
			else
				Utils.setAttribute(id, 'disabled', null);
		},
	
	
		setDisabled : function(id)
		{
			Utils.setAttribute(id, 'disabled', 'disabled');
		},	
	
	
		setReadOnly : function(id, readOnly)
		{
			if (readOnly == false)
				Utils.setAttribute(id, 'readOnly', null);
			else
				Utils.setAttribute(id, 'readOnly', 'true');
		},
	
	
		setClass : function(id, className)
		{
			Utils.setAttribute(id, 'class', className);
		},
	
	
		clearClass : function(id)
		{
			Utils.setAttribute(id, 'class', null);
		},
	
	
		setStyle : function(id, style)
		{
			Utils.setAttribute(id, 'style', style);
		},
	
	
		clearStyle : function(id)
		{
			Utils.setAttribute(id, 'style', null);
		},
		
		
		getCss : function(id, css)
		{
			return $( getJQueryId(id) ).css( css );
		},
		
		
		setCss : function(id, css)
		{
			$( getJQueryId(id) ).css( css );
		},
		
		
		getHtml : function(id)
		{
			return $( getJQueryId(id) ).html();
		},
	
	
		setHtml : function(id, content)
		{
			$( getJQueryId(id) ).html(content);
		},
	
	
		clearHtml : function(id)
		{
			Utils.setHtml(id,'');
		},
		
		
		remove : function(id)
		{
			$( getJQueryId(id) ).remove();
		},
		
		
		getText : function(id)
		{
			return Utils.getHtml(id);
		},
	
	
		setText : function(id, content, className)
		{
			if (className != null)
				Utils.setClass(id, className);
			
			Utils.setHtml(id, content);
		},
	
	
		clearText : function(id)
		{
			Utils.clearHtml(id);
			/* Utils.clearClass(id); */
		},
		
		
		isVisible : function(id)
		{
			return $( getJQueryId(id) ).is(':visible');
		},
	
	
		setVisible : function(id, set)
		{
			if (set == false)
				$( getJQueryId(id) ).hide();
			else
				$( getJQueryId(id) ).show();
		},
		
		
		setBlink : function(id, set)
		{
			var obj = getObjectById(id);
			
			if (obj == null)
				return;
			
			if (set == false)
			{
				/*clearInterval();*/
			}
			else
			{
				setInterval(function()
			    {
					var obj = getObjectById(id);
					obj.style.visibility = (obj.style.visibility == "") ? "hidden" : "";
			    },500);
			}
		},
	
	
		setHide : function(id)
		{
			$( getJQueryId(id) ).hide();
		},
		
		
		setDraggable : function(id)
		{
			$( getJQueryId(id) ).draggable();
		},
		
		
		slide : function(id)
		{
			if (Utils.isVisible(id))
				$( getJQueryId(id) ).slideUp();
			else
				$( getJQueryId(id) ).slideDown();
		},
		
		
		setTextValues : function(textValues, prefix)
		{
			if (textValues == null)
				return;
			
			$.each(textValues, function(key, text)
			{
				/*alert("key: "+key + ", text: " + text);*/
				
				var id = prefix ? prefix+key : key;
				Utils.setText( id, text );
			});
		},
		
		
		clearTextValues : function(prefix, parentId)
		{
			var selector = (prefix != null) ? ("label[id^='"+prefix+"'], span[id^='"+prefix+"']") : "label, span";

			if (parentId != null)
				selector = ('#' + parentId.escape() + " " + selector);
			
			$(selector).each(function()
			{
				$(this).html('');
			});
		},
	
	
		/*
		showFieldErrors : function(messages) 
		{
			if (messages != null)
				for (var i=0; i<messages.length; i++)
					$("#" + messages[i].field + "Error").html(messages[i].message).show();
		},
	
	
		showMessages : function(messages) 
		{
			if (messages != null)
				for (var i=0; i<messages.length; i++)
					$("#" + messages[i].field).html(messages[i].message).show();
		},
		*/
	
	
		getJSON : function(obj)
		{
			return JSON.stringify(obj);
		},
	
	
		clearAllFields : function()
		{
			$(':input').each(function()
			{
				Utils.clearValue(this.id);
			});
		},
		
		
		clearError : function(id)
		{
			$( getJQueryId(id+"Error") ).html('').hide();
		},
	
	
		clearErrors : function(parentId)
		{
			var selector = 'label[id$="Error"], span[id$="Error"]';
			
			if (parentId != null)
				selector = ('#' + parentId.escape() + " " + selector);
			
			$(selector).each(function()
			{
				$(this).html('').hide();
			});
		},
	
	
		clearAllErrors : function()
		{
			Utils.clearErrors();
		},
	
		
		setClearErrorsOnFocus : function(callback) 
		{
			$(':input').focus(function() 
			{
				$( getJQueryId(this.id+"Error") ).html('').hide();
				$( getJQueryId(this.name+"Error") ).html('').hide();
				
				if (callback != null)
					callback();
			});
		},
		
		
		setFocus : function(id)
		{
			$( getJQueryId(id) ).focus();
		},
		
		
		clearFocus : function(id)
		{
			$( getJQueryId(id) ).blur();
		},
	
	
		setFirstFocus : function()
		{
			/*$(':input:visible:enabled:first').focus();*/
			$(':input:visible:enabled').first().focus();
		},
		
		
		setClick : function(id, callBack, style)
		{
			$( getJQueryId(id) ).unbind("click");
			
			if (callBack != null)
				$( getJQueryId(id) ).click(callBack);
			
			if (style)
				Utils.setStyle(id, style);
		},
		
		
		fireClick : function(id)
		{
			$( getJQueryId(id) ).click();
		},
		
		
		fillTable : function(id, data, callbackRow)
		{
			var obj = getObjectById(id);
			
			if (obj == null)
				return;
			
			$( getJQueryId(id) ).empty();
			
			if (data == null)
				return;
			
			$.each(data, function(a, b) 
			{
				$( getJQueryId(id) ).append( callbackRow(a,b) );
			});
		}, 
		
		
		fillCombo : function(id, data, selected)
		{
			var obj = getObjectById(id);
			
			if (obj == null)
				return;
			
			$( getJQueryId(id) ).empty();
			
			if (data == null)
				return;
			
			/* list */
			if ($.isArray(data))
			{
				$.each(data, function(index, value) 
				{
					$( getJQueryId(id) ).append('<option value="'+value+'">'+value+'</option>');
				});
				
				if (selected != null)
				{
					$( getJQueryId(id) ).val(selected);
				}
				
				return;
			}
			
			/* lookups */
			if (data.elements != null)
			{			
				$.each(data.elements, function(key, element) 
				{
					$( getJQueryId(id) ).append('<option value="'+element.value+'">'+element.label+'</option>');
				});
				
				if (selected != null)
				{
					$( getJQueryId(id) ).val(selected);
				}
				else
				if (data.selecteds != null)
				{
					$( getJQueryId(id) ).val(data.selecteds);
				}
			}
		},
	
	
		showBody : function(callback)
		{
			if ( $('body').is(':visible') )
				return;
			
			$("body").show();
			
			if (callback != null)
				callback();
		},
	
	
		bodyFadeIn : function(callback)
		{
			$("body").hide();
			$("body").fadeIn("slow", callback);
		},
	
	
		setBlanks : function(id, n)
		{
			var blanks = "";
			
			for (var i=0; i<n; i++)
				blanks += "&#160";
			
			$( getJQueryId(id) ).html(blanks);
		},
	
	
		createIframe : function(id, src)
		{
			var iframe = getObjectById(id);
			
			if (iframe != null)
			{
				$( getJQueryId(id) ).prop("src", src);
			}
			else
			{
				iframe = $("<iframe>")
							.hide()
							.prop("id", id)
							.prop("src", src)
							.appendTo("body");
			}
			
			return iframe;
		},
		
		
		disableContextMenu : function()
		{
			$(document).bind('contextmenu', function(event) 
	  		{
	      		event.preventDefault();
	    	});
		},
		
		
		disableDraggingImages : function()
		{
			$('img').on('dragstart', function(event) 
			{ 
				event.preventDefault(); 
			});
		},
		
		
		isActiveX : function()
		{
			return 	(Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject")) 
					|| 
					("ActiveXObject" in window);
		},
		
		
		isUserMedia : function()
		{
			/* Note: Opera builds are unprefixed. */
			return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
		},
		
		
		isAjaxUploadWithProgress : function() 
		{
			  return supportFileAPI() && supportAjaxUploadProgressEvents() && supportFormData();

			  function supportFileAPI() 
			  {
				  var fi = document.createElement('input');
				  fi.type = 'file';
				  return 'files' in fi;
			  };

			  function supportAjaxUploadProgressEvents() 
			  {
				  var xhr = new XMLHttpRequest();
				  return !! (xhr && ('upload' in xhr) && ('onprogress' in xhr.upload));
			  };

			  function supportFormData() 
			  {
				  return !! window.FormData;
			  };
		},
		
		
		isIpadDevice : function()
		{
			var vendor = window.navigator.userAgent || window.navigator.vendor || window.opera;
			
			return /ipad/i.test(vendor.toLowerCase());
		},
		
		
		isIphoneDevice : function()
		{
			var vendor = window.navigator.userAgent || window.navigator.vendor || window.opera;
			
			return /iphone/i.test(vendor.toLowerCase());
		},
		
		
		isMobileDevice : function()
		{
			var vendor = window.navigator.userAgent || window.navigator.vendor || window.opera;
			
			vendor = vendor.toLowerCase();
			
			/*
			var iPad = /ipad/i.test(vendor.toLowerCase());
			if (iPad)
				return true;
			
			var iPhone = /iphone/i.test(vendor.toLowerCase());
			if (iPhone)
				return true;
			
			var iPod = /ipod/i.test(vendor.toLowerCase());
			if (iPod)
				return true;
			*/
			
			var iDevice = /ipad|iphone|ipod/i.test(vendor);
			if (iDevice)
				return true;
			
			var android = /android/i.test(vendor);
			if (android)
				return true;
			
			var blackBerry = /blackberry/i.test(vendor);
			if (blackBerry)
				return true;
			
			var webOS = /webos/i.test(vendor);
			if (webOS)
				return true;
			
			var windowsPhone = /windows phone/i.test(vendor);
			if (windowsPhone)
				return true;
			
			return false;
		},
		
		
		createCookie : function(name, value, days, path, domain, secure) 
		{
			/*
			$.cookie("test", 1, 
			{
			   expires : 10,           // expires in 10 days

			   path    : '/',          // the value of the path attribute of the cookie 
			                           // (default: path of page that created the cookie).

			   domain  : 'jquery.com', // the value of the domain attribute of the cookie
			                           // (default: domain of page that created the cookie).

			   secure  : true          // if set to true the secure attribute of the cookie
			                           // will be set and the cookie transmission will
			                           // require a secure protocol (defaults to false).
			});
			*/
			
			var expires = (days != null) ? days : 365 * 10;	// 10 a�os
			
			$.cookie(name, value, { expires: expires });
		},
		
		
		readCookie : function(name)
		{
			return $.cookie(name);
		},
		
		
		removeCookie : function(name)
		{
			$.removeCookie(name);
		},
		
	};
	
})();

