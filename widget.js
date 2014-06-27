/*
Custom object for inserting live feed iframe
v 0.1
Iain McQueen <imcqueen@synapsemail.com>
Synapse Group Inc

*/

(function(){
function showLiveFeed(container, options) {
	var that = this;
	that.container = (typeof(container) == "object") ? container : document.getElementById(container);

	//DEFAULTS
	that.options = {
		frameSrc:"output.html",
		articleCount:18,
		lineHeight:28,
		fontFamily:"Helvetica Neue,Helvetica,sans-serif"
	};
	
	// User defined options if necessary in the future
	if (typeof options == 'object') {
		for (i in options) {
			that.options[i] = options[i];
		}
	}
	
	that.outputIframe();
}

showLiveFeed.prototype = {
	
	container:{},
	
	measureDimensions:function(){
		var that = this;
		var width = that.container.offsetWidth;
		var height = (that.options.articleCount * that.options.lineHeight) / Math.floor(width/200) ;
		height += 140;
		return {width:width, height:height};
	},
	
	outputIframe:function(){
		var that = this;
		var dimensions = that.measureDimensions();
		var srcOptions = that.getSourceOptions(dimensions);
		//http://stackoverflow.com/questions/8726455/creating-an-iframe-using-javascript
		var ifrm = document.createElement("iframe");
		ifrm.setAttribute("src", that.options.frameSrc+srcOptions);
		//no borders
		ifrm.setAttribute("frameBorder", "0");
		ifrm.setAttribute("seamless", "seamless");
		ifrm.style.border = "0";
		//set dimensions
		ifrm.style.width = dimensions.width+"px";
		ifrm.style.height = dimensions.height+"px";
		ifrm.style.padding = "0";
		ifrm.style.margin = "0";
		
		console.log(dimensions.height);
		
		//no scrollbars
		ifrm.style.overflow = 'hidden';
		ifrm.setAttribute("scrolling","no");
		that.container.appendChild(ifrm);
	},
	
	getSourceOptions:function(dimensions){
		var that = this,
		dimensions = dimensions || that.measureDimensions(),
		srcOptions = "";
		
		var srcOptionsList = {};
		srcOptionsList.width = dimensions.width;
		srcOptionsList.height = dimensions.height;
		srcOptionsList.articleCount = that.options.articleCount;
		srcOptionsList.lineHeight = that.options.lineHeight;
		srcOptionsList.fontFamily = that.options.fontFamily;
		
		for(var i in srcOptionsList){
			srcOptions +=  "&" + i +"="+encodeURIComponent(srcOptionsList[i]);
		}
		//replace first ampersand with ? and return;
		return srcOptions.replace(/&/,"?");
	}
	
}

//expose code 
window.showLiveFeed = showLiveFeed;

})();

var peopleLiveFeed = new showLiveFeed('pplfeed');
