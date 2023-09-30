import { ObjectIdColumn } from 'typeorm';

export class AbstractEntity<T> {
  @ObjectIdColumn()
  _id: string;

  constructor(partial: Partial<T>) {
    Object.assign(this, partial);
  }
}
