export interface SiteSettings {
  siteName: string
  siteUrl: string
  tagline?: string
  logoUrl?: string
  faviconUrl?: string
  defaultLanguage: string
  timezone: string
  dateFormat: string
  postsPerPage: number
  maintenanceMode: boolean
  analyticsCode?: string
}

export interface InstallerState {
  installed: boolean
  version: string
  installedAt?: string
}
