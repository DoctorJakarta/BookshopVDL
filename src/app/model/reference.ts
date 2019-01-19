export class Reference {
  public id: number;
  public bookId: number;
  public price: number;
  public url: string;
  public desc: string;
  public comment: string;

  constructor( bookId: number ) {
      this.bookId = bookId;
  }
}
