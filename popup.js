chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	var currentTab = tabs[0].url;
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {	
		if(response == undefined || !response.showButtons) {
			$("#allChange").hide();
			$("#copyBtn").hide();
            $("#exportBtn").hide();
			$("#popupMessage").removeAttr("contenteditable");
		}
		
		if(response == undefined) {
			$("#popupMessage").html('Rosie is compatible with Gmail, Outlook, Slack, LinkedIn, Yahoo, and GroupMe.<br><br>Visit <a href="https://rosiesays.github.io/about/" target="_blank">rosiesays.github.io/about/</a> to learn more about Rosie!');
			return;
		}
		
		let analyzer = new textAnalyzer();
		
		getCurrentWebsite(currentTab);

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
		document.getElementById("exportBtn").addEventListener("click", function () {
			port.postMessage({textContent: prepareForDisplay($("#popupMessage").html().toString())});
		});
	});
  });
