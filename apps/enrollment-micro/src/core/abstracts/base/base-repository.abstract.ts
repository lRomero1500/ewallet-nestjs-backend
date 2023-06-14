import { Repository, FindOptionsWhere, FindOneOptions } from 'typeorm';
import { BaseRepositoryInterface } from '../../interfaces/repositories/base/base-repository.interface';
import { NotFoundException } from '@nestjs/common';
interface HasId {
  id: string | number;
}
export abstract class BaseRepositoryAbstract<T extends HasId>
  implements BaseRepositoryInterface<T>
{
  constructor(private readonly entity: Repository<T>) {}
  async getAll(): Promise<T[]> {
    return await this.entity.find();
  }
  async get(id: any): Promise<T | null> {
    const options: FindOptionsWhere<T> = {
      id: id,
    };
    return await this.entity.findOneBy(options);
  }
  async getByCondition(filterCondition: FindOneOptions<T>): Promise<T | null> {
    return await this.entity.findOne(filterCondition);
  }
  async create(item: T): Promise<T> {
    return await this.entity.save(item);
  }
  async update(id: any, item: any): Promise<T> {
    const options = {
      id: id,
      ...item,
    };
    const record = await this.entity.preload(options);
    if (record) {
      return await this.entity.save(record);
    } else throw new NotFoundException(`record not found ${id}`);
  }
}
