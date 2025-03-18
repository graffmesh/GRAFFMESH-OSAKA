import { describe, it, beforeEach, expect, vi } from 'vitest';
import apiService from '../services/apiService';

global.fetch = vi.fn();

describe('apiService', () => {
  const endpoint = '/test-endpoint';
  const mockResponse = {
    success: true,
    annotations: [{ id: 1, text: 'Test annotation' }],
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return data when the backend responds successfully', async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await apiService.getAnnotations(endpoint);

    expect(result.success).toBe(true);
    expect(result.annotations).toEqual(mockResponse.annotations);
  });

  it('should return an error when the backend responds with an error', async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      json: async () => ({ success: false, message: 'Error message' }),
    });

    const result = await apiService.getAnnotations(endpoint);

    expect(result.success).toBe(false);
    expect(result.error).toBe('Error message');
  });

  it('should return an error when the fetch request fails', async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('Network error')
    );

    const result = await apiService.getAnnotations(endpoint);

    expect(result.success).toBe(false);
    expect(result.error).toBe('Network error');
  });
});
// The beforeEach function is already correctly implemented in the context of the test suite.
// You can remove the erroneous placeholder implementation.
