function textFormatter () {
	var self = this;
	
	/**
	* Format the linebreaks with newline characters and remove all preceding white space
	*/
	self.prepareForCopy = (str) => {
		return self.removeBeginningWhiteSpace(this.formatLineBreaks(str, "\n"));
	}

	/**
	* Format the linebreaks with <br> and remove all preceding line breaks
	*/
	self.prepareForDisplay = (str) => {
		return self.removeBeginningBr(this.formatLineBreaks(str, "<br>", ["br"]));
	}

	/**
	* Replaces html with the proper line break encoding in the proper spots
	*/
	self.formatLineBreaks = (str, lineBreak, exclusions) => {
		let removeNewLines = str.replace(/\r?\n|\r/g, "");
		let removeDivDiv = removeNewLines.replace(/<div><div>/g, lineBreak);
		let removeDiv = removeDivDiv.replace(/<div><\/div>/g, "").replace(/<div>(<br>)?/g, lineBreak);
		let removeP = removeDiv.replace(/<p><\/p>/g, "").replace(/<\/p>/g, lineBreak);
		let removeBr = removeP.replace(/<br>/g, lineBreak);
		return self.removeCode(removeBr, exclusions).replace(/&nbsp;/g, " ");
	}

	/**
	* Remove any <br>'s at the beginning of the string
	*/
	self.removeBeginningBr = (str) => {
		return str.replace(/^(<br>)*/, "");
	}

	/**
	* Remove any white space at the beginning of the string
	*/
	self.removeBeginningWhiteSpace = (str) => {
		return str.replace(/^\s/, "");
	}

	/**
	* Removes any HTML code by replacing anything between a '<' and a '>' (and the brackets themselves) with an empty string. 
	* Doesn't remove tags specified to be excluded in exclusions
	*/
	self.removeCode = (str, exclusions) => {
		if(exclusions == null){
			return str.replace(/<[^>]*>/g, "");
		}
		var pattern = "<(?!" + exclusions.join(")[^>]*>|<(?!") + ")[^>]*>";
		return str.replace(new RegExp(pattern, "g"), "");
	}
}