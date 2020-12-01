function icons_load() { // icons load from fontawesome
    var a = document.createElement("link");
    (a.href = "https://use.fontawesome.com/releases/v5.12.0/css/all.css"), (a.rel = "stylesheet"), (a.type = "text/css");
    document.getElementsByTagName("head")[0].appendChild(a);
}