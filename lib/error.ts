import { ZodError } from 'zod'

interface ErrorResponse {
  success: false
  message: string
  errors?: { field: string; message: string }[]
  source?: string
}

export const handleError = (error: unknown, source?: string): ErrorResponse => {
  const response: ErrorResponse = {
    success: false,
    message: 'An unexpected error occurred.',
    source,
  }

  if (error instanceof ZodError) {
    response.message = 'Validation failed'
    response.errors = error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }))
  } else if (error instanceof Error) {
    response.message = error.message
  }

  console.error(`Error in ${source || 'unknown function'}:`, error)

  return response
}
