import * as GitHub from 'github-api';

interface GitHub {
  getRepo(owner: string, repo: string): Repository;
}

interface Repository {
  getContents(branch: string, file: string, raw: boolean);
}

export class GitHubApi {
  private gh: GitHub;
  private repo: Repository;

  constructor() {
    this.gh = new GitHub();
    this.repo = this.gh.getRepo('johanfrick', 'davidmiles-angular');
  }

  getFileFromRepo(textFile: string, successCallback, errorCallback?) {
    this.repo.getContents('data', textFile, true)
      .then(value => {
        successCallback(value.data);
      }, reason => {
        console.error(reason);
        errorCallback(reason);
      });
  }
}
