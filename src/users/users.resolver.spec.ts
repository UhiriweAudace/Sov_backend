import { Test, TestingModule } from '@nestjs/testing';
import { swapiCronJob } from '../cronjob/swapi';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver, UsersService, PrismaService],
    }).compile();
    await swapiCronJob({ isTestMode: true });
    resolver = module.get<UsersResolver>(UsersResolver);
  }, 60000);

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('Should return all people', async () => {
    const { page_info, edges } = await resolver.findAll({ page: 0 });
    expect(page_info.totalCount).toBeGreaterThan(0);
    expect(edges.length).toBeGreaterThan(0);
  }, 60000);

  it('Should return all people for a specific page number', async () => {
    const result = await resolver.findAll({ page: 2 });
    expect(result).toHaveProperty('page_info');
    expect(result).toHaveProperty('edges');
    const { page_info, edges } = result;
    expect(page_info.totalCount).toEqual(10);
    expect(edges.length).toBeGreaterThan(0);
  }, 60000);

  it('Should return all people who matches the provided name', async () => {
    const { page_info, edges } = await resolver.search('Ac');
    expect(page_info.totalCount).toEqual(edges.length);
  }, 60000);
});
