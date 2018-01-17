// isolation
(function () {

var a11ycss = a11ycss || {};

a11ycss.checkalts = {
	imgs : {},
	namespace: "a11ycss_checkalts_",
	reporter: document.createElement('div'),
	strings: {
		ok: "OK",
		info: "empty",
		ko: "missing"
	},
	// string templates for pictograms
	pics: {
		ok:"<img src='' class='{NAMESPACE}picto {NAMESPACE}picto_ok'>",
		empty:"<img src='' class='{NAMESPACE}picto {NAMESPACE}picto_info'>",
		missing:"<img src='' class='{NAMESPACE}picto {NAMESPACE}picto_ko'>"
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
				display:none;
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
				tmptpl = tmptpl.replace(`{ALT}`, this.strings.ko);
				tmptpl = tmptpl.replace(`{PICTOGRAM}`,
					this.pics.missing.replace(/{NAMESPACE}/g,this.namespace) );
			} else if(tmpimg.alt === '') {
				tmptpl = tmptpl.replace(`{ALT}`, this.strings.info);
				tmptpl = tmptpl.replace(`{PICTOGRAM}`,
					this.pics.empty.replace(/{NAMESPACE}/g, this.namespace));
			} else {
				tmptpl = tmptpl.replace(`{ALT}`, "'" + tmpimg.alt + "'");
				tmptpl = tmptpl.replace(`{PICTOGRAM}`,
					this.pics.ok.replace(/{NAMESPACE}/g, this.namespace));
			}

			if (tmpimg.getAttribute('title') === null) {
				tmpstr = this.strings.ko;
			} else if (tmpimg.title === '') {
				tmpstr = this.strings.info;
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

	// this changes strings to locale if an array of strings was provided
	// by the extension's call to the script
	updateStrings: function (strings) {
		this.strings = strings;
	},

	// this changes the pictos with icons stored in the webextension
	updatePictos: function(icons) {
		var keys = [ "info", "ko", "ok" ];
		var classPrefix = a11ycss.checkalts.namespace + 'picto_';
		keys.forEach(function(key) {
			var elts = document.getElementsByClassName(classPrefix + key);
			for(var i = 0 ; i < elts.length ; i++) {
				elts[i].src = icons[key.valueOf()];
				elts[i].style = 'display:block;';
				elts[i].alt = a11ycss.checkalts.strings[key.valueOf()];
			}
		}, this);
	},

	init: function() {
		if (document.getElementById(this.namespace + 'reporter')) {
			return;
		}
		this.buildReporter();
		this.collectImages();
		this.addBehaviour();
	}
};

browser.runtime.onMessage.addListener((message) => {
	if (message.a11ycss_action && message.a11ycss_action === "checkalts") {
		if(message.strings) {
			a11ycss.checkalts.updateStrings(message.strings);
		}
		a11ycss.checkalts.init();
		if (message.icons) {
			a11ycss.checkalts.updatePictos(message.icons);
		}
	}
});

})();
// end isolation
