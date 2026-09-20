export interface IUser {
            _id?: string,
            id?: string,
            first_name: string,
            last_name: string,
            username: string,
            email: string,
            image: string,
            password: string
}

export interface IResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  results: IUser[];
}