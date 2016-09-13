(function () {
    var app = {
      createRequest: function (uri) {
        var req = new XMLHttpRequest();
        req.open("GET", uri, true)
        req.send(null);
        console.log(req.responseText);
// → This is the content of data.txt
      }
    }
})()
