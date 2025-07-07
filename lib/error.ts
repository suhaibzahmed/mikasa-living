import { Prisma } from '@prisma/client'
import { ZodError } from 'zod'

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof ZodError) {
    return 'Invalid input provided.'
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // See https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
    switch (error.code) {
      case 'P2002':
        // Unique constraint failed
        return `An entry with this value already exists.`
      case 'P2025':
        // Record to update not found
        return 'The record to update was not found.'
      default:
        return 'A database error occurred.'
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Internal Server Error. Please try again.'
}
