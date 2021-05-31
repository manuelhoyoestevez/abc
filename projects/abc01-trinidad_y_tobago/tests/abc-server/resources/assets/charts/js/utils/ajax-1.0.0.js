

String.prototype.isEmpty = function()
{ return (!this || 0 === this.length); };

String.prototype.endsWith = function(str)
{ return (this.match(str+"$")==str); };


/** Singleton **/

var Ajax = (function()
{
	/*** private ***/

    var API_CONTEXT = "/api";
    var SECURITY_SERVICE = "/security/token/create";

	var _log = false;
	var _jwtToken = "";


	function log(msg)
    {
        if (_log)
            //alert("[Ajax] " + msg);
            console.log("[Ajax] " + msg);
    }

    /*
    function getUrlPath()
    {
        var url = window.location.href;

        if (url.endsWith("/"))
            url = url.substring(0, url.length-1);

        return url.substring(0, url.lastIndexOf("/"));
    }
    */

    function getContextPath()
    {
        //return window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));

        try
        {
            var contextPath = "/" + $(location).prop("pathname").split("/")[1];
            return (contextPath == API_CONTEXT) ? "" : contextPath;
        }
        catch (e)
        {
            return "";
        }
    }

    function getParameterByName(name)
    {
        try
        {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(window.location.search);
            return (results != null) ? decodeURIComponent(results[1].replace(/\+/g, " ")) : "";
        }
        catch (e)
        {
            return null;
        }
    }

    function getUrlService(servicePath)
    {
        var ssl = ((getParameterByName("ssl") || "0") == "1");

        // $(location).prop("protocol") --> http(s):

        var url = (ssl ? "https://" : "http://")
                + $(location).prop("host")
                + getContextPath()
                + API_CONTEXT
                ;

        //alert("url: " + url);

        return url + servicePath;
    }

    function error(msg)
    {
        alert(msg);
    }

    function success(responseBean, callbackSuccess, callbackNotSuccess)
    {
        log("responseBean status: " + responseBean.status);

        switch (responseBean.status)
        {
            case "ok":
            {
                if ($.isFunction(callbackSuccess))
                    callbackSuccess(responseBean);
                break;
            }

            case "error":
            {
                if ($.isFunction(callbackNotSuccess))
                    callbackNotSuccess(responseBean);
                break;
            }

            case "validation_error":
            {
                if ($.isFunction(callbackNotSuccess))
                    callbackNotSuccess(responseBean);
                break;
            }

            case "security_error":
            {
                _jwtToken = "";

                if ($.isFunction(callbackNotSuccess))
                    callbackNotSuccess(responseBean);
                break;
            }
        }
    }

    function send(async, url, type, params, callbackSuccess, callbackNotSuccess)
    {
        log("send: " + url);

        $.ajax(
        {
            url			: url,
            type		: type,									/* get | post */
            contentType	: 'application/json; charset=UTF-8',	/* tipo de contenido que se envia al server */
            data  		: JSON.stringify( params ),				/* datos que se envian al server */
            dataType	: 'json',								/* tipo de datos experados del server */
            async 		: async,
            crossDomain	: true,
            cache		: false,
            headers		: {
                            "Authorization" : _jwtToken
                            /*
                            "My-First-Header"  : "first value",
                            "My-Second-Header" : "second value"
                            */
                          },

            success : function(response, textStatus, jqXHR)
            {
                log("jqXHR status: " + jqXHR.status);
                log("text status: " + textStatus);

                _jwtToken = jqXHR.getResponseHeader("Authorization") || "";

                //alert("token recibido: " + _jwtToken);

                success(response, callbackSuccess, callbackNotSuccess);
            },

            error : function(jqXHR, textStatus, errorThrown)
            {
                log("jqXHR status: " + jqXHR.status);
                log("text status: " + textStatus);

                error("Request Failed: " + errorThrown);
            }
        });
    }


    function doAuthorization(callback)
    {
        var sourceCode = getParameterByName("sc");

        if (!sourceCode.isEmpty())
        {
            _jwtToken = "";

            //alert("token enviado: " + _jwtToken);

            var url = getUrlService( SECURITY_SERVICE );

            var params = { sourceCode : sourceCode };

            send(true, url, 'POST', params, callback);
        }
        else
        {
            if ($.isFunction(callback))
                callback();
        }
    }



    /*** public ***/

    return {

        authorization : function(callback)
        {
            doAuthorization(callback);
        },

        get : function(async, url, params, callbackSuccess, callbackNotSuccess)
        {
            send(async, url, 'GET', params, callbackSuccess, callbackNotSuccess);
        },

        post : function(async, url, params, callbackSuccess, callbackNotSuccess)
        {
            send(async, url, 'POST', params, callbackSuccess, callbackNotSuccess);
        },

        getUrlService : function(servicePath)
        {
            return getUrlService(servicePath);
        }

    };

})();

