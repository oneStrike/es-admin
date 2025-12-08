export type SystemHealthResponse = {
  
  status?: string

  
  info?: Record<string, any>

  
  error?: Record<string, any>

  
  details?: Record<string, any>

  /** 任意合法数值 */
  [property: string]: any
}

export type SystemReadyResponse = {
  
  status?: string

  
  info?: Record<string, any>

  
  error?: Record<string, any>

  
  details?: Record<string, any>

  /** 任意合法数值 */
  [property: string]: any
}