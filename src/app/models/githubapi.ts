import * as Octokit from '@octokit/rest';
import {AuthorizationService} from '../services/authorization.service';
import {Auth} from '@octokit/rest';

export class GitHubApi {
  static OWNER = 'johanfrick';
  static REPO = 'davidmiles-angular';
  static BRANCH = 'data';

  private authorizationService: AuthorizationService;
  private octokit: Octokit;

  constructor(authorizationService: AuthorizationService) {
    this.octokit = new Octokit();
    this.authorizationService = authorizationService;
  }

  // Needed for special characters such as å,ä,ö
  static b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  getFileFromRepo(path: string, successCallback, errorCallback?) {
    const params: Octokit.ReposGetContentParams = {
      owner: GitHubApi.OWNER,
      repo: GitHubApi.REPO,
      path: path,
      ref: GitHubApi.BRANCH
    };
    this.octokit.repos.getContent(params)
      .then(response => {
        successCallback({data: GitHubApi.b64DecodeUnicode(response.data.content), sha: response.data.sha});
      }).catch(reason => {
      console.error(reason);
      errorCallback(reason);
    });
  }

  login(username: string, password: string, success: any) {
    this.authenticate(username, password);
    const params = {};
    this.octokit.users.getEmails(params).then(success);
  }

  authenticate(username: string, password: string) {
    const auth: Auth = {
      type: 'basic',
      username: username,
      password: password
    };
    this.octokit.authenticate(auth);
  }

  writeFile(path: string, content: string, original, successCallback, errorCallback?) {
    this.authenticate(AuthorizationService.getUsername(), AuthorizationService.getPassword());

    const author = {name: 'website', email: 'post@davidmiles.se'};
    this.octokit.repos.updateFile({
      owner: GitHubApi.OWNER,
      repo: GitHubApi.REPO,
      path: path,
      message: `Updated ${path} from web site`,
      content: btoa(content),
      sha: original.sha,
      branch: GitHubApi.BRANCH,
      committer: author,
      author: author,
    }).then(response => {
      successCallback(content, response.data.content.sha);
    }, reason => {
      console.error(reason);
      errorCallback(reason);
    });
  }
}
