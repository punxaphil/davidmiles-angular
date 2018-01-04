/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

/* GitHub API */
declare module 'github-api' {
  export function getRepo(owner: string, repo: string): Repository;
}

interface Repository {
  getContents(branch: string, file: string, raw: boolean);
}
