export class ApiResponse {
  products: any;
  total: number=0;
  skip?: number;
  limit?: number;
  success?: boolean;
  message?: string;
}
