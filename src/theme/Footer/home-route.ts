export function isHomepagePath(pathname: string, homepagePath: string) {
  const withTrailingSlash = (path: string) =>
    path.endsWith("/") ? path : `${path}/`;
  return withTrailingSlash(pathname) === withTrailingSlash(homepagePath);
}
