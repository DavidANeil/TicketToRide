export class Player {
  constructor(public id: string, public name: string) {}


  public serialize() {
    return JSON.stringify({
      'id': this.id,
      'name': this.name,
    });
  }

  static deserialize(parsed: any): Player|null {
    if (parsed && typeof parsed === 'object' && typeof parsed.id === 'string' &&
        typeof parsed.name === 'string') {
      return new Player(parsed.id, parsed.name);
    } else {
      return null;
    }
  }
}