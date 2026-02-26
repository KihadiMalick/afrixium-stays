// Formes standard des réponses API

// Réponse succès
export interface ApiSuccess<T> {
  success: true;
  data:    T;
  message?: string;
}

// Réponse erreur
export interface ApiError {
  success: false;
  error:   string;
  code?:   string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// Helper pour créer une réponse succès
export function apiSuccess<T>(data: T, message?: string): ApiSuccess<T> {
  return { success: true, data, message };
}

// Helper pour créer une réponse erreur
export function apiError(error: string, code?: string): ApiError {
  return { success: false, error, code };
}
