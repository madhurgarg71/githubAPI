function getRepo () {
  var query = document.getElementById('searchBy').value
  var req = new XMLHttpRequest()
  var uri = 'https://api.github.com/search/repositories?q=' + query
  console.log(uri);
  req.open('GET', uri, true)
  req.addEventListener('load', function () {
    console.log('Done:', req.status)
    var content = document.getElementById('content-table')
    var result = JSON.parse(req.responseText)
    var repoCount = result.total_count || 0
    var repoCountNode = document.getElementById('repoCount')
    repoCountNode.innerHTML = repoCount
    console.log(result);
    content.innerHTML = ''
    result.items.forEach(function (repo) {
      var ele = '<tr><td>' + repo.name + '</td></tr>'
      content.innerHTML += ele
    })
    getUser(query)
  })
  req.send(null)

}
