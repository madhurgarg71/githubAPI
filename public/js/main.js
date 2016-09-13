  var app = {
    createRequest: function (uri) {
      var req = new XMLHttpRequest()
      req.open('GET', uri, true)
      req.addEventListener('load', function () {
        console.log('Done:', req.status)
        var data = JSON.parse(req.responseText)
        return data
      })
    },
    getRepos: function (query) {
      var uri = 'api.github.com/search/repositories?q=' + query
      console.log(uri);
      var repos = this.createRequest(uri)
      return repos
    },
    getUsers: function (query) {
      var uri = '' + query
      var users = this.createRequest(uri)
      return users
    },
    displayRepos: function () {
      var query = document.getElementById('searchBy').value
      console.log(query)
      this.getRepos(query, function (repos) {
        console.log(repos)
        var reposCount = repos.total_count
        document.getElementById('reposCount').innerHTML = reposCount
        var content = document.getElementById('content-table')
        content.innerHTML = ''
        repos.items.forEach(function (repo) {
          content.innerHTML += repo.name
        })
      })
    },
    displayUsers: function () {
      var users = this.getUsers()
      var usersCount = users.total_count
      document.getElementById('usersCount').innerHTML = usersCount
      var content = document.getElementById('content-table')
      content.innerHTML = ''
      users.items.forEach(function (user) {
        content.innerHTML += user.login
      })
    }
  }
