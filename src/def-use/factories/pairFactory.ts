import Pair from "../types/pair";

/**
 * Factory for Pair
 */
class PairFactory {
    create(first: any, second: any): Pair {
        return new Pair(first, second);
    }
}

export const pairFactory = new PairFactory();