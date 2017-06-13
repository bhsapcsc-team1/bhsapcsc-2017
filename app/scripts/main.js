require.config({
	paths: {
		jquery: 'libs/jquery-2.1.4',
		jqueryMobile: 'libs/jquery.mobile-1.4.5'
	},
  shim: {
	"libs/jquery.mobile-1.4.5'" : { deps: ["jquery"], exports: 'jquery' },
  }
});

require(["jquery",
	"jqueryMobile",
], function ($) {
  console.log('jQuery version ' + $().jquery + ' installed');
});


function getDocHeight(doc) {
    doc = doc || document;
    // from http://stackoverflow.com/questions/1145850/get-height-of-entire-document-with-javascript
    var body = doc.body, html = doc.documentElement;
    var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    return height;
}

function setIframeHeight(id) {
    var ifrm = document.getElementById(id);
    var doc = ifrm.contentDocument? ifrm.contentDocument: ifrm.contentWindow.document;
    ifrm.style.visibility = 'hidden';
    ifrm.style.height = "10px"; // reset to minimal height in case going from longer to shorter doc
    ifrm.style.height = getDocHeight( doc ) + 10 + "px";
    ifrm.style.visibility = 'visible';
}

// Parse URL Queries
function url_query( query ) {
    query = query.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var expr = "[\\?&]"+query+"=([^&#]*)";
    var regex = new RegExp( expr );
    var results = regex.exec( window.location.href );
    if ( results !== null ) {
        return results[1];
    } else {
        return false;
    }
}

