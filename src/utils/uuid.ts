/** Interface for ID generators */
interface IIdGenerator {
  nextId(): number;
  reset(): void;
  getCurrent(): number;
}

/** Centralized ID manager for all ID generators */
class IdManager {
  private static instance: IdManager;
  private generators: Map<string, IIdGenerator> = new Map();
  private defaultCounter = 1;

  private constructor() {}

  /** Get singleton instance */
  static getInstance(): IdManager {
    if (!IdManager.instance) {
      IdManager.instance = new IdManager();
    }
    return IdManager.instance;
  }

  /** Register an ID generator */
  register(name: string, generator: IIdGenerator): void {
    this.generators.set(name, generator);
  }

  /** Get or create a numeric ID generator */
  getNumberGenerator(name: string, startFrom = 1): IIdGenerator {
    if (!this.generators.has(name)) {
      this.generators.set(name, new NumberIdGenerator(startFrom));
    }
    return this.generators.get(name)!;
  }

  /** Get next ID from specified generator */
  nextId(generatorName: string): number {
    const generator = this.generators.get(generatorName);
    if (!generator) {
      throw new Error(`ID generator "${generatorName}" is not registered`);
    }
    return generator.nextId();
  }

  /** Reset all ID generators */
  resetAll(): void {
    this.generators.forEach(generator => generator.reset());
  }

  /** Reset specific ID generator */
  reset(generatorName: string): void {
    const generator = this.generators.get(generatorName);
    if (generator) {
      generator.reset();
    }
  }
}

/** Numeric ID generator implementation */
class NumberIdGenerator implements IIdGenerator {
  private counter: number;

  constructor(startFrom = 1) {
    this.counter = startFrom;
  }

  nextId(): number {
    return this.counter++;
  }

  reset(): void {
    this.counter = 1;
  }

  getCurrent(): number {
    return this.counter;
  }
}


// Get the singleton instance
const idManager = IdManager.getInstance();

// Use factory methods
export const defGenerator = idManager.getNumberGenerator('def', 1);
export const nodeGenerator = idManager.getNumberGenerator('flownode', 1);
export const taintGenerator = idManager.getNumberGenerator('taint', 1);

// Reset specific generator
// idManager.reset('definition');
