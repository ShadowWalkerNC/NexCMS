export type ExtensionType = 'component' | 'module' | 'plugin' | 'package'

export type HookEvent =
  | 'onPageRender'
  | 'onContentSave'
  | 'onContentPublish'
  | 'onMediaUpload'
  | 'onFormSubmit'
  | 'onUserLogin'
  | 'onUserCreate'

export interface ExtensionManifest {
  name: string
  type: ExtensionType
  version: string
  author: string
  license: string
  description?: string
  entrypoint: string
  hooks?: HookEvent[]
  adminPanel?: boolean
  routes?: string[]
  dependencies?: Record<string, string>
  nexcmsVersion?: string // semver range e.g. '>=1.0.0'
}
