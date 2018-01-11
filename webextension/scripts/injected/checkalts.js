var a11ycss = a11ycss || {};

a11ycss.checkalts = {
	imgs : {},
	namespace: "a11ycss_checkalts_",
	reporter: document.createElement('div'),
	strings: {
		empty: "EMPTY",
		missing: "MISSING"
	},
	// string templates for pictograms
	pics: {
		ok:"<img src='' style='display:none;' alt='OK' class='{NAMESPACE}picto {NAMESPACE}picto_ok'>",
		empty:"<img src='' style='display:none;' alt='Empty' class='{NAMESPACE}picto {NAMESPACE}picto_empty'>",
		missing:"<img src='' style='display:none;' alt='Missing' class='{NAMESPACE}picto {NAMESPACE}picto_missing'>"
	},

	extensionpics: {},
	// The reporter is a zone in the page where we gather thumbnails
	buildReporter: function() {
		var reporterid = this.namespace + 'reporter';
		this.reporter.id = reporterid;
		var style = `
			body {
				margin-left:150px !important;
			}
			div#${reporterid} {
				z-index:20000;
				position:fixed;
				top:0;
				left:0px;
				width:150px;
				height:100vh;
				background:silver;
				margin:0;
				padding:0;
				overflow:auto;
				font-family:arial,helvetica,sans-serif;
				font-size:.8rem;
			}
			div#${reporterid} figure {
				margin:5px;
				position:relative;
				cursor:pointer;
			}
			div#${reporterid} img {
				width:auto;
				height:auto;
				max-width:100%;
			}
			div#${reporterid} img.${this.namespace}picto {
				position:absolute;
				top:0;
				left:0;
				width:32px;
				height:32px;
			}
		`;
		var s = document.createElement('style');
		s.innerHTML = style;
		document.getElementsByTagName('head').item(0).appendChild(s);
		document.getElementsByTagName('body').item(0).appendChild(this.reporter);
	},
	// we collect images and add information on them
	collectImages: function() {
		var imgs = document.getElementsByTagName('img');
		var str = '';
		var tpl = `
			<figure data-target="{TARGET}">
				{PICTOGRAM}
				<img src="{SRC}" alt="">
				<figcaption>
				<code>alt=</code><b>{ALT}</b><br>
				<code>title=</code><b>{TITLE}</b>
				</figcaption>
			</figure>
		`;

		for (var i=0; i < imgs.length; i++) {
			var tmptpl = tpl;
			var tmpimg = imgs[i];
			var tmpstr = '';
			var tmppicto = '';

			tmpimg.classList.add(this.namespace + "targetimage" + i);
			
			// populate strings
			tmptpl = tmptpl.replace(`{TARGET}`, this.namespace + "targetimage" + i);
			tmptpl = tmptpl.replace(`{SRC}`, tmpimg.src);
			
			if (tmpimg.getAttribute('alt') === null) {
				tmptpl = tmptpl.replace(`{ALT}`, this.strings.missing);
				tmptpl = tmptpl.replace(`{PICTOGRAM}`,
					this.pics.missing.replace(`{NAMESPACE}`,this.namespace) );
			} else if(tmpimg.alt === '') {
				tmptpl = tmptpl.replace(`{ALT}`, this.strings.empty);
				tmptpl = tmptpl.replace(`{PICTOGRAM}`,
					this.pics.empty.replace(`{NAMESPACE}`, this.namespace));
			} else {
				tmptpl = tmptpl.replace(`{ALT}`, "'" + tmpimg.alt + "'");
				tmptpl = tmptpl.replace(`{PICTOGRAM}`,
					this.pics.ok.replace(`{NAMESPACE}`, this.namespace));
			}

			if (tmpimg.getAttribute('title') === null) {
				tmpstr = this.strings.missing;
			} else if (tmpimg.title === '') {
				tmpstr = this.strings.empty;
			} else {
				tmpstr = "'" + tmpimg.title + "'";
			}
			tmptpl = tmptpl.replace(`{TITLE}`, tmpstr);
			
			str += tmptpl;
			// end populate strings

		}
		this.reporter.innerHTML = str;
	},
	// we add behaviour on the figures (thumbnails) we gathered in the reporter
	addBehaviour: function () {
		var that = this; // yeah I know it's cheap but I'm going for easy here.
		var figures = this.reporter.getElementsByTagName('figure');
		for(var i = 0 ; i < figures.length ; i++) {
			var f = figures[i];
			f.setAttribute('tabindex',0);
			f.addEventListener('click',function(){
				that.handleThumbnail(this);
			});
			f.addEventListener('keypress',function(e){
				if (e.keyCode === 13) {
					that.handleThumbnail(this);
				}
			});
		}
	},
	// this handles events on thumbnails and scrolls to desired image
	handleThumbnail: function(elt) {
		var scrollElt = document.getElementsByClassName(elt.getAttribute('data-target')).item(0);
		scrollElt.scrollIntoView({
			block: "start",
			inline: "nearest",
			behavior: "smooth"
		});
	},

	// used for dev purposes
	// @@TODO remove
	testScript: function() {
		// var ok = chrome.extension
		// browser.runtime.onMessage.addListener((message) => {
		// 	if(message.icons) {
		// 		console.log("runtime message : ", message.icons);
		// 	}
		// });
	},

	init: function() {
		this.buildReporter();
		this.collectImages();
		this.addBehaviour();
		this.testScript();
		// browser.runtime.onMessage.addListener((message) => {
		// 	if (message.icons) {
		// 		console.log(message.icons);
		// 	}
		// });
	}
};

// window.addEventListener('load', function () {
	a11ycss.checkalts.init();
// });

// this does not work
// console says "ReferenceError: browser is not defined"
browser.runtime.onMessage.addListener((message) => {
	if (message.icons) {
		console.log(message.icons);
	}
});

