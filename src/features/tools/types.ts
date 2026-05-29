export type ToolCategory = 'productivity' | 'education' | 'finance'

export interface ToolInputField {
  id: string
  type: 'number' | 'text' | 'select' | 'range'
  label: string
  placeholder?: string
  unit?: string
  min?: number
  max?: number
  step?: number
  defaultValue?: string | number
  options?: { label: string; value: string }[]
  required: boolean
}

export interface Tool {
  id: string
  slug: string
  title: string
  description: string
  category: ToolCategory
  inputs: ToolInputField[]
  hasExport: boolean
  relatedTemplateId?: string
  tags: string[]
  calculate: (inputs: Record<string, string | number>) => ToolResult
  renderOutput?: (result: ToolResult) => ToolOutputSection[]
}

export interface ToolResult {
  primary: string
  secondary?: string
  sections?: ToolOutputSection[]
  exportText?: string
}

export interface ToolOutputSection {
  label: string
  value: string
  note?: string
}

export interface ToolCategoryInfo {
  id: ToolCategory
  slug: string
  label: string
  description: string
  icon: string
}
