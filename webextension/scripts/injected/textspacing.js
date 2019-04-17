// isolation
(function () {

var a11ycss = a11ycss || {};

a11ycss.textspacing = {
	namespace: "a11ycss_textspacing_",
	cssid: '{NAMESPACE}css',
	cssstring: `
		* {
			line-height: 1.5!important;
			letter-spacing:.12em!important;
			word-spacing: .16em !important;
		}
		p{
			margin-bottom: 2em!important;
		}
	`,

	toggleCSS: function() {
		if( document.getElementById(this.cssid) ) {
			document.getElementsByTagName('head').item(0).removeChild(document.getElementById(this.cssid));
		} else {
			var s = document.createElement('style');
			s.id = this.cssid;
			s.innerHTML = this.cssstring;
			document.getElementsByTagName('head').item(0).appendChild(s);
		}
	},

	init: function() {
		this.cssid = this.cssid.replace(/{NAMESPACE}/g,this.namespace);
		this.toggleCSS();
	}
};

browser.runtime.onMessage.addListener(message => {
	if (message.a11ycss_action && message.a11ycss_action === "textspacing") {
		console.log("message.a11ycss_action : ", message.a11ycss_action);
		a11ycss.textspacing.init();
	}
});

})();
// end isolation
