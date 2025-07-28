export interface ActionResult {
  status: 'success' | 'error';
  data?: unknown;
  error?: string;
}
