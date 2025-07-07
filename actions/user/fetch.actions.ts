'server only'

import { prisma } from '@/lib/db'
import { handleError } from '@/lib/error'

export async function getUsers(params: {
  page?: number
  pageSize?: number
  sort?: string
  filter?: string
}) {
  const { page = 1, pageSize = 10, sort, filter } = params

  try {
    const users = await prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: filter ? { name: { contains: filter, mode: 'insensitive' } } : {},
      orderBy: sort
        ? { [sort.split(':')[0]]: sort.split(':')[1] }
        : { createdAt: 'desc' },
    })

    const totalUsers = await prisma.user.count({
      where: filter ? { name: { contains: filter, mode: 'insensitive' } } : {},
    })

    return {
      success: true,
      data: {
        users,
        pagination: {
          page,
          pageSize,
          total: totalUsers,
          totalPages: Math.ceil(totalUsers / pageSize),
        },
      },
    }
  } catch (error) {
    return handleError(error, 'getUsers')
  }
}
