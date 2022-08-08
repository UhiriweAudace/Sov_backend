import { Resolver, Query, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserFilter } from '../shared/graphql';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('users')
  findAll(@Args('where') where: UserFilter) {
    return this.usersService.findAll(where);
  }

  @Query('search')
  search(@Args('keyword') keyword: string) {
    return this.usersService.search(keyword);
  }
}
