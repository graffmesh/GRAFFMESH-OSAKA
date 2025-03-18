export interface ApiResponse {
  success: boolean;
  data?: unknown;
  error?: string;
  [key: string]: unknown; // Add index signature
}
