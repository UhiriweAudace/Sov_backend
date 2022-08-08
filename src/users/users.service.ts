import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserFilter } from '../shared/graphql';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(filter?: UserFilter) {
    const users = await this.prisma.user.findMany({
      where: filter?.page ? filter : {},
      orderBy: [{ page: 'asc' }, { third_party_userId: 'asc' }],
    });

    const page_info = { totalCount: users.length };
    return { page_info, edges: users };
  }

  async search(keyword: string) {
    const users = await this.prisma.user.findMany({
      where: { name: { contains: keyword, mode: 'insensitive' } },
    });

    const page_info = { totalCount: users.length };
    return { page_info, edges: users };
  }
}
