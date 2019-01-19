export class Tag {
  public key: string;
  public name: string;
 }

export class TagCheckbox {
  public key: string;
  public name: string;
  public checked = false;

  constructor ( t: Tag ) {
      this.key = t.key;
      this.name = t.name;
  }
}
