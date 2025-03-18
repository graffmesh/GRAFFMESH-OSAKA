/// <reference types="chrome"/>
const BACKEND_URL = 'https://graffmesh-backend-64469df74644.herokuapp.com';
import { Annotation } from '../types';

interface FetchOptions extends RequestInit {
  body?: string;
}

interface FetchResult {
  success: boolean;
  error?: string;
  annotations?: Annotation[]; // Replace `any` with the appropriate type if known
  message?: string;
}

async function fetchWithBackend(
  endpoint: string,
  options: FetchOptions = {}
): Promise<FetchResult> {
  try {
    const response = await fetch(`${BACKEND_URL}${endpoint}`, options);
    const result: FetchResult = await response.json();

    if (!response.ok || !result.success) {
      console.error(
        `Error from backend (${endpoint}):`,
        result.message || response.statusText
      );
      return { success: false, error: result.message || response.statusText };
    }

    return result;
  } catch (error) {
    console.error(`Failed to communicate with backend (${endpoint}):`, error);
    return { success: false, error: (error as Error).message };
  }
}

interface AddAnnotationResult {
  success: boolean;
  error?: string;
}

async function addAnnotation(
  url: string,
  annotation: Annotation
): Promise<AddAnnotationResult> {
  const result = await fetchWithBackend('/annotations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, annotation }),
  });

  if (result.success) {
    // Store in local cache
    await chrome.storage.local.set({ [url]: annotation });
    console.log(`Annotation added for URL: ${url}`);
    return { success: true };
  }

  return { success: false, error: result.error || 'Failed to add annotation.' };
}

interface GetAnnotationsResult {
  success: boolean;
  error?: string;
  annotations?: Annotation[];
}

async function getAnnotations(url: string): Promise<GetAnnotationsResult> {
  try {
    // Fetch from backend server
    const result = await fetchWithBackend(
      `/annotations?url=${encodeURIComponent(url)}`,
      { method: 'GET' }
    );

    if (result.success && result.annotations) {
      // Store in local cache
      await chrome.storage.local.set({ [url]: result.annotations });
      console.log(`Fetched annotations for URL: ${url}`);
      return { success: true, annotations: result.annotations };
    }

    return { success: false, error: result.error || 'Annotations not found.' };
  } catch (error) {
    console.error(`Failed to get annotations for URL ${url}:`, error);
    return { success: false, error: (error as Error).message };
  }
}

interface DeleteAnnotationResult {
  success: boolean;
  error?: string;
}

async function deleteAnnotation(
  url: string,
  elementSelector: string
): Promise<DeleteAnnotationResult> {
  try {
    const result = await fetchWithBackend('/annotations', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, elementSelector }),
    });

    if (result.success) {
      // Delete from local cache
      await chrome.storage.local.remove(url);
      console.log(`Annotation deleted for URL: ${url}`);
      return { success: true };
    }

    return {
      success: false,
      error: result.error || 'Failed to delete annotation.',
    };
  } catch (error) {
    console.error('Failed to delete annotation:', error);
    return { success: false, error: (error as Error).message };
  }
}

const apiService = {
  addAnnotation,
  getAnnotations,
  deleteAnnotation,
};

export default apiService;
