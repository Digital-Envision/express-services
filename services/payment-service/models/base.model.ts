import {
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

export type UnknownModel = Model<NonNullable<unknown>, NonNullable<unknown>>;

class BaseModel<
    T extends UnknownModel,
    ModelAttributes extends InferAttributes<T> = InferAttributes<T>,
    CreationAttributes extends
    InferCreationAttributes<T> = InferCreationAttributes<T>,
> extends Model<ModelAttributes, CreationAttributes> {
}

export default BaseModel