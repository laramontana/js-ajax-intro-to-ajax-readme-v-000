function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)                                                                                 //We need to do this to make sure that the current element, that is, the link being clicked,
                                                                                                    //is available to our getCommits function so that we can get at that data attribute later.
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  const req = new XMLHttpRequest() //means we are constructing an api call,
                                  //basically saying we are going to go to another url and retrieve some data.

  req.addEventListener("load", showRepositories); //means when the data loads, it's going to call the showRepositories.
                                                 //However this won't get executed until after it gets sent

  req.open("GET", 'https://api.github.com/users/laramontana/repos') //is telling the request that we are creating,
                                                                   //where it's going to go to get the data
  req.send() //is when we send off the request to fetch our data

  //once the data gets loaded, then showRepositories gets called,
  //with the event from the eventListener and the data from the request
}

function getCommits(el) {
  const name = el.dataset.repo //Here we grab that data-repo value through the dataset property,
  const req = new XMLHttpRequest() //then set up an XHR request,
  req.addEventListener("load", showCommits) //with an event listener and callback function, just like we did in getRepositories
  req.open("GET", 'https://api.github.com/repos/laramontana/' + name + '/commits')
  req.send()
}

function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}
