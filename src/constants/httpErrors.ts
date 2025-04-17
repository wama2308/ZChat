export const httpErrorMessages: Record<number, string> = {
  400: "Solicitud incorrecta.",
  401: "Sesión expirada. Por favor, inicia sesión nuevamente.",
  403: "No tienes permisos para esta acción.",
  404: "Recurso no encontrado.",
  409: "Conflicto de datos.",
  422: "Datos inválidos. Revisa los campos.",
  429: "Demasiadas peticiones. Intenta más tarde.",
  500: "Error interno del servidor.",
  503: "Servicio no disponible. Intenta más tarde.",
};
