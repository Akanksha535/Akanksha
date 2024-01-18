function fetchRepositories() {
  const username = $('#username').val();
  const repoList = $('#repoList');
  const loader = $('#loader');
  const pagination = $('#pagination');

  loader.show();
  repoList.empty();
  pagination.empty();

  $.ajax({
    url: `https://api.github.com/users/${username}/repos`,
    data: { page: 1, per_page: 10 },
    success: function (data) {
      loader.hide();
      displayRepositories(data);
      displayPagination(data.length);
    },
    error: function (error) {
      loader.hide();
      repoList.append(`<li>Error fetching repositories</li>`);
    }
  });
}

function displayRepositories(repositories) {
  const repoList = $('#repoList');
  repoList.empty();

  repositories.forEach(repo => {
    repoList.append(`<li>${repo.name} - ${repo.description}</li>`);
  });
}

function displayPagination(totalRepos) {
  const pagination = $('#pagination');
  const maxPerPage = 10; // Change based on your requirements
  const totalPages = Math.ceil(totalRepos / maxPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pagination.append(`<button onclick="fetchPage(${i})">${i}</button>`);
  }
}

function fetchPage(pageNumber) {
  const username = $('#username').val();
  const repoList = $('#repoList');
  const loader = $('#loader');

  loader.show();
  repoList.empty();

  $.ajax({
    url: `https://api.github.com/users/${username}/repos`,
    data: { page: pageNumber, per_page: 10 },
    success: function (data) {
      loader.hide();
      displayRepositories(data);
    },
    error: function (error) {
      loader.hide();
      repoList.append(`<li>Error fetching repositories</li>`);
    }
  });
}
