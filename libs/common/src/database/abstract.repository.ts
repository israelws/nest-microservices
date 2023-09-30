import { AbstractEntity } from './abstract.entity';
import { Logger, NotFoundException } from '@nestjs/common';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
  protected abstract readonly logger: Logger;
  constructor(
    private readonly entityRepository: Repository<T>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(entity: T): Promise<T> {
    return this.entityManager.save(entity);
  }

  async findOne(where: FindOptionsWhere<T>): Promise<T> {
    const entity = await this.entityRepository.findOne({ where });

    if (!entity) {
      this.logger.warn(`Not found: ${JSON.stringify(where)}`);
      throw new NotFoundException('Not found');
    }

    return entity;
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ) {
    const updateResult = await this.entityRepository.update(
      where,
      partialEntity,
    );

    if (updateResult.affected === 0) {
      this.logger.warn(`Not found: ${JSON.stringify(where)}`);
      throw new NotFoundException('Not found');
    }

    return this.findOne(where);
  }

  async find(where: FindOptionsWhere<T>): Promise<T[]> {
    return this.entityRepository.find({ where });
  }

  async findOneAndDelete(
    where: FindOptionsWhere<T>,
  ): Promise<{ deleted: boolean }> {
    const deleteResult = await this.entityRepository.delete(where);

    if (deleteResult.affected === 0) {
      this.logger.warn(`Not found: ${JSON.stringify(where)}`);
      throw new NotFoundException('Not found');
    }

    return { deleted: true };
  }
}
