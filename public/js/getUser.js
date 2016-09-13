function getUser (query) {
  var req = new XMLHttpRequest()
  var uri = 'https://api.github.com/search/users?q=' + query
  req.open('GET', uri, true)
  req.addEventListener('load', function () {
    console.log('Done:', req.status)
    var result = JSON.parse(req.responseText)
    var userCount = result.total_count || 0
    var userCountNode = document.getElementById('userCount')
    userCountNode.innerHTML = userCount
  })
  req.send(null)
}
