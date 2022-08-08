/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class UserFilter {
  page: number;
}

export class User {
  name: string;
  height?: Nullable<string>;
  mass?: Nullable<string>;
  gender?: Nullable<string>;
  homeworld?: Nullable<string>;
}

export class PageInfo {
  totalCount: number;
}

export class UserResponse {
  page_info?: Nullable<PageInfo>;
  edges: Nullable<User>[];
}

export abstract class IQuery {
  abstract users(
    where?: Nullable<UserFilter>,
  ): Nullable<UserResponse> | Promise<Nullable<UserResponse>>;

  abstract search(
    keyword: string,
  ): Nullable<UserResponse> | Promise<Nullable<UserResponse>>;
}

type Nullable<T> = T | null;
