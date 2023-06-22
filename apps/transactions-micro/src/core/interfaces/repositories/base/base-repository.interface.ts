import { FindOneOptions } from 'typeorm';

export interface BaseRepositoryInterface<T> {
  getAll(): Promise<T[]>;
  get(id: any): Promise<T | null>;
  getByCondition(filterCondition: FindOneOptions<T>): Promise<T | null>;
  create(item: T): Promise<T>;
  update(id: any, item: T): Promise<T>;
}
