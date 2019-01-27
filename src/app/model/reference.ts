export class Reference {
  public id: number;
  public bookId: number;
  public price: number;
  public url: string;
  public desc: string;
  public notes: string;

  constructor( bookId: number ) {
      this.bookId = bookId;
  }
}
