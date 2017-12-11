var a11ycss = a11ycss || {};

a11ycss.checkalts = {
	imgs : {},
	namespace: "a11ycss_checkalts_",
	reporter: document.createElement('div'),
	strings: {
		empty: "EMPTY",
		missing: "MISSING"
	},
	pics: {
		ok:"<img src='../icons/alt_ok.png' alt='OK' class='{NAMESPACE}picto'>",
		empty:"<img src='../icons/alt_empty.png' alt='Empty' class='{NAMESPACE}picto'>",
		missing:"<img src='../icons/alt_missing.png' alt='Missing' class='{NAMESPACE}picto'>"
	},

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
			}
		`;
		var s = document.createElement('style');
		s.innerHTML = style;
		document.getElementsByTagName('head').item(0).appendChild(s);
		document.getElementsByTagName('body').item(0).appendChild(this.reporter);
	},

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

	addBehaviour: function () {
		var figures = this.reporter.getElementsByTagName('figure');
		for(var i = 0 ; i < figures.length ; i++) {
			var f = figures[i];
			f.setAttribute('tabindex',0);
			f.addEventListener('click',function(){
				var scrollElt = document.getElementsByClassName(this.getAttribute('data-target')).item(0);
				scrollElt.scrollIntoView({
					block: "start",
					inline: "nearest",
					behavior: "smooth"
				});
			});
		}
	},

	init: function() {
		this.buildReporter();
		this.collectImages();
		this.addBehaviour();
	}
};

window.addEventListener('load', function () {
	a11ycss.checkalts.init();
});