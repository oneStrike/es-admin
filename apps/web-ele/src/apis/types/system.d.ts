export type SystemHealthResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  details?: Record<string, any>;

  error?: null | Record<string, any>;

  info?: null | Record<string, any>;

  status?: string;
};

export type SystemReadyResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  details?: Record<string, any>;

  error?: null | Record<string, any>;

  info?: null | Record<string, any>;

  status?: string;
};
