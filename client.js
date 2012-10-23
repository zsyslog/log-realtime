function setCookie(c_name,value,exdays) {
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value + "; path=/";
}

function getCookie(c_name) {
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++) {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name) {
            return unescape(y);
        }
    }
}

function generateUniqueId() {
    var Number = new Date().getTime();
    var Random = Math.random();
    var UniqueId = Number + "" + Random;
    UniqueId = UniqueId.replace(".", "");
    return UniqueId;
}

function getUniqueId() {
    var UniqueId = getCookie("CustomCookie");
    if(UniqueId === undefined) {
        UniqueId = generateUniqueId();
        setCookie("CustomCookie", UniqueId, 365)
    }
    return UniqueId;
}

(function() {
	var rtimg = document.createElement("img");
	var this_url = location.href.split("?")[0];
	rtimg.src = "http://www.yourserver.com:8080/_rtlc.gif?_rtlcu="+this_url+"&_rtlcs="+getUniqueId();
	document.body.appendChild(rtimg);
})()

