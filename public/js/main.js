function init () {
  var app = {
    reposData: null,
    usersData: null,
    issuesData: null,
    userReposData: null,
    content: document.getElementById('content-table'),
    createRequest: function (uri, CB) {
      var req = new XMLHttpRequest()
      req.open('GET', uri, true)
      req.addEventListener('load', function () {
        console.log('Done:', req.status)
        var data = JSON.parse(req.responseText)
        CB(data)
      })
      req.send(null)
    },
    getRepos: function (query, CB) {
      var uri = 'http://api.github.com/search/repositories?q=' + query
      this.createRequest(uri, function (data) {
        CB(data)
      })
    },
    getUsers: function (query, CB) {
      var uri = 'http://api.github.com/search/users?q=' + query
      this.createRequest(uri, function (data) {
        CB(data)
      })
    },
    getIssues: function (fullname) {
      var uri = 'https://api.github.com/repos/' + fullname + '/issues'
      var self = this
      this.createRequest(uri, function (data) {
        self.issuesData = data.filter(function (item) {
          return item.state === 'open'
        })
        self.displayIssues()
      })
    },
    getUserRepos: function (username) {
      var uri = 'https://api.github.com/users/' + username + '/repos'
      // console.log(uri);
      var self = this
      this.createRequest(uri, function (data) {
        self.userReposData = data
        self.displayUserRepos()
      })
    },
    search: function () {
      var query = document.getElementById('searchBy').value
      var self = this

      this.getRepos(query, function (data) {
        self.reposData = data
        var reposCount = self.reposData.total_count
        document.getElementById('reposCount').innerHTML = reposCount
        self.displayRepos()
      })
      this.getUsers(query, function (data) {
        self.usersData = data
        var usersCount = self.usersData.total_count
        document.getElementById('usersCount').innerHTML = usersCount
      })
    },
    displayRepos: function () {
      var self = this
      this.content.innerHTML = ''
      this.reposData.items.forEach(function (repo) {
        var repoNameStr = '<a ' + 'id=' + repo.id + ' href=/#/repos' +  repo.id + 'issues/' + ' onClick="app.getIssues(\'' + repo.full_name + '\')">'
        self.content.innerHTML += '<tr><td>' + repoNameStr + '<h4>' + repo.owner.login + '/' + repo.name + '</h4>' + '</a>' + '</td></tr>'
      })
    },
    displayUsers: function () {
      var self = this
      this.content.innerHTML = ''
      this.usersData.items.forEach(function (user) {
        var userNameStr = '<a ' + 'id=' + user.login + ' href=/#/users/' + user.login + '/repos/' + ' onClick="app.getUserRepos(\'' + user.login + '\')">'
        self.content.innerHTML += '<tr><td>' + '<img width=50 height=50 src=' +
         user.avatar_url + '>' + ' ' + '<span>' + userNameStr + user.login + '</a>' + '</span>' + '</td></tr>'
      })
    },
    displayIssues: function () {
      var self = this
      this.content.innerHTML = ''
      this.issuesData.forEach(function (issue) {
        self.content.innerHTML += '<tr><td>' + '<h4>' + '<span class="open">' + issue.state + '</span>' + ' ' + issue.title + ' ' + '</h4>' + '</td></tr>'
      })
    },
    displayUserRepos: function () {
      var self = this
      console.log(this.userReposData);
      this.content.innerHTML = ''
      this.userReposData.forEach(function (userRepo) {
        self.content.innerHTML += '<tr><td>' + '<h4>' + userRepo.full_name + '</h4>' + '</td></tr>'
      })
    }
  }
  return app
}
