import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return all people if no page number argument passed to users query', async () => {
    const { page_info, edges } = await service.findAll();
    expect(page_info.totalCount).toBeGreaterThan(0);
    expect(edges.length).toBeGreaterThan(0);
  });

  it('Should return all people for a specific page number', async () => {
    const { page_info, edges } = await service.findAll({ page: 2 });
    expect(page_info.totalCount).toEqual(10);
    expect(edges.length).toBeGreaterThan(0);
  });

  it('Should return all people who matches the provided name', async () => {
    const { page_info, edges } = await service.search('Ac');
    expect(page_info.totalCount).toEqual(edges.length);
  });
});
