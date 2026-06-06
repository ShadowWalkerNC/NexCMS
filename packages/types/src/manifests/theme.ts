export type ThemeRegion =
  | 'header'
  | 'nav'
  | 'hero'
  | 'main'
  | 'sidebar-left'
  | 'sidebar-right'
  | 'footer'
  | 'off-canvas'

export interface ThemeColorTokens {
  primary: string
  secondary?: string
  accent?: string
  background: string
  surface: string
  text: string
  textMuted: string
}

export interface ThemeFontTokens {
  display: string
  body: string
  mono?: string
}

export interface ThemeManifest {
  name: string
  version: string
  author: string
  license: string
  description?: string
  preview: string // path to preview.png
  regions: ThemeRegion[]
  colorTokens: ThemeColorTokens
  fontTokens: ThemeFontTokens
  nexcmsVersion?: string
}
