chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
		if($(document.activeElement).attr("contenteditable")){
			var inputBox = document.activeElement;
			sendResponse({
				messageText: $(document.activeElement).html(),
				showButtons: true
				});
		} else{
			sendResponse({
				messageText: "To use Rosie, click into an input field, and then click on Rosie to get suggestions for your writing.",
				showButtons: false
				});
		}

		var port = chrome.runtime.connect({name: "exportToPage"});
		port.postMessage({content: "Put back into email"});
		port.onMessage.addListener(function(msg) {
  		if (msg.textContent !== null) {
		console.log("HIHI I want to update this thing!");
		inputBox.innerHTML = msg.textContent;
  	}
});
});