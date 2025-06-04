export class ReviewModel {
  id?: number;
  productId?: number;
  userId?: number;
  rating: number = 0;
  comment?: string;
  date?: Date;
  reviewerName?: string; // Optional field for reviewer's name
  reviewerEmail?: string; // Optional field for reviewer's email

  constructor(id?: number, productId?: number, userId?: number, rating: number = 0, comment?: string, date?: Date) {
    this.id = id;
    this.productId = productId;
    this.userId = userId;
    this.rating = rating;
    this.comment = comment;
    this.date = date;
  }
}
