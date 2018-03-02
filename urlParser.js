var sites = [
    {
        url: "google",
        name: "Google" 
    },
    {
        url: "slack",
        name: "Slack" 
    },
    {
        url: "outlook",
        name: "Outlook" 
    },
    {
        url: "linkedin",
        name: "LinkedIn" 
    },
    {
        url: "yahoo",
        name: "Yahoo" 
    },
    {
        url: "groupme",
        name: "GroupMe" 
    }
]

getCurrentWebsite = (currentTab) => {
    for(let i = 0; i < sites.length; i++) {
        if(currentTab.includes(sites[i].url)) {
            let siteName = sites[i].name;
            document.getElementById("exportBtn").innerHTML=`Export to ${siteName}`;
            break;
        }
    }
}
