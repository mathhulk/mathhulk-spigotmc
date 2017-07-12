function replaceAllTheThings() {
    
    document.title = "SpigotMC: Mathhulk Edition";
    
    var st = document.createElement("style");
        if(st != null) {
        st.type = "text/css";
        st.rel = "stylesheet";
        st.innerHTML = httpGet("chrome-extension://"+chrome.runtime.id+"/assets/css/mathhulk.css");
        document.body.insertBefore(st, document.body.firstChild);
    }
    
    var sp = document.getElementById("Sponsors");
    if(sp != null) {
        sp.innerHTML = httpGet("chrome-extension://"+chrome.runtime.id+"/assets/html/sponsors.html");
    }
    
    var imgs = document.getElementsByTagName('img');
    for (i = 0; i < imgs.length; i++) {
        if (imgs[i].title == "Funny" || imgs[i].alt == "Funny") {
            imgs[i].src = "chrome-extension://"+chrome.runtime.id+"/assets/img/mathhulk.png";
            imgs[i].style = "background: url('') no-repeat 0px -128px; width: 16px; height: 16px;";
        } else if (imgs[i].title == "Agree" || imgs[i].alt == "Agree") {
            imgs[i].src = "chrome-extension://"+chrome.runtime.id+"/assets/img/methhulk.png";
            imgs[i].style = "background: url('') no-repeat 0px -128px; width: 16px; height: 16px;";
        } else if (imgs[i].title == "Informative" || imgs[i].alt == "Informative") {
            imgs[i].src = "chrome-extension://"+chrome.runtime.id+"/assets/img/mathhulk_standing.png";
            imgs[i].style = "background: url('') no-repeat 0px -128px; width: 16px; height: 16px;";
        } else if (imgs[i].alt == "SpigotMC - High Performance Minecraft") {
            imgs[i].src = "chrome-extension://"+chrome.runtime.id+"/assets/img/mathhulk.png";
        }
    }
}

if (document.getElementById('XenForo'))
{
    if (document.getElementById('XenForo').classList.contains('LoggedIn'))
    {
        chrome.runtime.sendMessage({'url': document.getElementsByTagName('base')[0].href, 'title': document.getElementsByClassName('boardTitle')[0].innerText, 'image': document.querySelector('link[rel="apple-touch-icon"]').href}, function(response) {
            console.log(response);
        });
    }
    if (document.getElementsByClassName('sidebar').length > 0)
    {
        var sidebar = document.getElementsByClassName('sidebar')[0];
        chrome.runtime.sendMessage({'fetch': 'ad', 'url': document.getElementsByTagName('base')[0].href}, function(response) {
        });
    }
}

function httpGet(theUrl) {
  var xmlHttp = null;

  xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false );
  xmlHttp.send( null );
  return xmlHttp.responseText;
}

replaceAllTheThings();