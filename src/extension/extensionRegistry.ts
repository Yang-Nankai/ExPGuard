import { ExtensionScript } from "./extensionScript";

export class ScriptRegistry {
  private readonly scripts = new Map<string, ExtensionScript>();

  register(script: ExtensionScript): void {
    this.scripts.set(script.key, script);
  }

  get(key: string): ExtensionScript | undefined {
    return this.scripts.get(key);
  }

  values(): Iterable<ExtensionScript> {
    return this.scripts.values();
  }

  keys(): Iterable<string> {
    return this.scripts.keys();
  }

  has(key: string): boolean {
    return this.scripts.has(key);
  }

  entries(): Iterable<[string, ExtensionScript]> {
    return this.scripts.entries();
  }
}
