import * as GitHub from 'github-api';
import {AuthorizationService} from '../services/authorization.service';

interface GitHub {
  getRepo(owner: string, repo: string): Repository;
}

interface Repository {
  getContents(branch: string, file: string, raw: boolean);

  writeFile(branch: string, path: string, content: string, message: string, options);
}

export class GitHubApi {
  private gh: GitHub;
  private repo: Repository;
  private authorizationService: AuthorizationService;

  constructor(authorizationService: AuthorizationService) {
    this.gh = new GitHub();
    this.authorizationService = authorizationService;
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

  writeFile(path: string, content: string, successCallback, errorCallback?) {
    this.authorizationService.getGithubWithCredentials()
      .getRepo('johanfrick', 'davidmiles-angular')
      .writeFile('data', path, content, `Updated ${path} from web site`, {
        author: {name: 'website', email: 'post@davidmiles.se'},
        encode: true
      })
      .then(response => {
        successCallback();
      }, reason => {
        console.error(reason);
        errorCallback(reason);
      });
  }
}
