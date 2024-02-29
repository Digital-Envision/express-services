import {
  Attributes,
  FindAndCountOptions,
  InferAttributes,
  InferCreationAttributes,
  Model,
  ModelStatic,
  Op,
  Order,
} from 'sequelize';
import { compact, omit } from '../utils/common';

export type UnknownModel = Model<NonNullable<unknown>, NonNullable<unknown>>;
export type StaticModel = ModelStatic<UnknownModel> & {
  associate?: (db: unknown) => void;
};

class BaseModel<
  T extends UnknownModel,
  ModelAttributes extends InferAttributes<T> = InferAttributes<T>,
  CreationAttributes extends
    InferCreationAttributes<T> = InferCreationAttributes<T>,
> extends Model<ModelAttributes, CreationAttributes> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static associate(db: unknown) {}

  public static async findCountAll<U extends UnknownModel>(
    options: FindAndCountOptions<Attributes<U>>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filterQueryParams: Record<any, any> = {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query: Record<any, any> = {}
  ) {
    let order: Order = query.order && compact([query.order]);
    const otherOptions = omit(query, ['limit', 'offset', 'page', 'order']);

    const rules: unknown[] = [{ ...filterQueryParams }];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: Record<any, any> = {
      ...(options?.where ?? {}),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as Record<any, any>;

    const AND = Op.and as never;

    if (where[AND]) {
      where[AND] = [...where[AND], ...rules];
    } else {
      where[AND] = rules;
    }

    if (options.order) {
      order = options.order;

      // eslint-disable-next-line no-param-reassign
      delete options.order;
    }

    const queries = {
      ...options,
      where: where as never,
      order: order ?? [['createdAt', 'DESC']],
      ...otherOptions,
    };

    return this.findAndCountAll(queries);
  }
}

export default BaseModel;
