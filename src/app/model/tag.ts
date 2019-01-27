export class Tag {
  public id: number;
  public name: string;
 }

export class TagCheckbox {
  public id: number;
  public name: string;
  public checked = false;

  constructor ( t: Tag ) {
      this.id = t.id;
      this.name = t.name;
  }
}
