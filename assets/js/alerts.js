var Alerts;
function AddSite(site)
{
    chrome.storage.local.get(null, function(results) 
        {
            var url = site.url;
            var obj = {};
            obj[url] = site;

            chrome.storage.local.set(obj);
            if (!results[url])
            {
                chrome.alarms.create(site.url, {'delayInMinutes': 5, 'periodInMinutes': 5});
            }
            else
            {
                updateSite(url);
            }
        }
    );
}

function updateSite(url)
{
    chrome.tabs.getSelected(null, function(tab)
        {
            var urlTrimmed = tab.url.substr(0, url.length);
            if (url != urlTrimmed)
            {
                chrome.storage.local.get(null, function(results) 
                    {
                        if (results[url])
                        {
                            var site = results[url];
                            var xhr = new XMLHttpRequest();
                            xhr.open("GET", url + '?_xfResponseType=json', true);
                            xhr.setRequestHeader('X_REQUESTED_WITH', 'XMLHttpRequest');
                            xhr.onreadystatechange = function()
                            {
                                if (xhr.readyState == 4)
                                {
                                    console.log(url, xhr);
                                    var resp = JSON.parse(xhr.response);
                                    var notify = false;
                                    if (!resp.error)
                                        return;
                                    if (typeof resp._visitor_conversationsUnread !== undefined)
                                    {
                                        var msg = "";
                                        if (resp._visitor_conversationsUnread > 0)
                                        {
                                            if (resp._visitor_conversationsUnread == 1)
                                                msg = msg + "You have 1 new message.";
                                            else
                                                msg = msg + "You have " + resp._visitor_conversationsUnread + " new messages.";

                                            notify = true;
                                        }

                                        if (resp._visitor_alertsUnread > 0)
                                        {
                                            if (resp._visitor_alertsUnread == 1)
                                                msg = msg + "You have 1 new alert.";
                                            else
                                                msg = msg + "You have " + resp._visitor_alertsUnread + " new alerts.";

                                            notify = true;
                                        }

                                        if (notify)
                                        {
                                            var opt = {
                                                type: "basic",
                                                title: site.title,
                                                message: msg,
                                                iconUrl: site.image
                                            };
                                            console.log(opt);
                                            chrome.notifications.clear(url, function (wasCleared) { });
                                            chrome.notifications.create(url, opt, function (id) { });
                                        }
                                    }
                                }
                            }
                            xhr.send();
                        }
                    }
                );
            }
        }
    );
}

chrome.alarms.onAlarm.addListener(
    function (alarm)
    {
        updateSite(alarm.name);
    }
);
    
chrome.notifications.onClicked.addListener(
    function (site)
    {
        chrome.tabs.create({'url': site}, function (tab) { });
    }
);