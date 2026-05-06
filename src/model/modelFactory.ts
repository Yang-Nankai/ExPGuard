import Model from "./model";


/**
 * ModelFactory
 */
class ModelFactory {
    create() {
        return new Model();
    }
}

export const modelFactory = new ModelFactory();