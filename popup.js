chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {	
		if(response == undefined || !response.showButtons) {
			$("#allChange").hide();
			$("#copyBtn").hide();
		}
		
		if(response == undefined) {
			$("#popupMessage").html("Rosie is compatible with Gmail, Outlook, Slack, LinkedIn, Yahoo, and GroupMe.");
			return;
		}
		
		let analyzer = new textAnalyzer();
		
		let toAnalyze = prepareForDisplay(response.messageText);
		
		$("#popupMessage").html(analyzer.analyze(toAnalyze));
		analyzer.registerEventListeners();
		
		new Clipboard('#copyBtn', {
			text: function(trigger) {
				return prepareForCopy($("#popupMessage").html().toString());
			}
		});
    });
});

chrome.runtime.onConnect.addListener(function(port) {
	console.assert(port.name == "exportToPage");
	console.log("knock knock");
	port.onMessage.addListener(function(msg) {
	  if (msg.content == "Put back into email")
		document.getElementById("testButton").addEventListener("click", function () {
			port.postMessage({textContent: prepareForDisplay($("#popupMessage").html().toString())});
		});
	});
  });
