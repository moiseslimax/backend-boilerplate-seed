export interface AuthenticateDTO {
  refreshToken: string;
  userId: number;
  expireDate: Date;
}
