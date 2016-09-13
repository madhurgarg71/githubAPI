(function () {
  function getData () {
    var repos = getRepo(function () {

    })
    var users = getuser()
    var data = []
    data.push(repos, users)

    return data
  }
  var searchBtn = document.getElementById('searchBtn')
  var data = searchBtn.addEventListener('click', getData, false)
  console.log(data)
})()
