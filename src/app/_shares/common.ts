export interface GhostSiteResponse {
  status: string,
  data: any,
}
export interface LoginResponse extends GhostSiteResponse {
  token: string
}
