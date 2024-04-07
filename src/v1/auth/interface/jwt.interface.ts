export interface JwtSign {
  access_token: string;
}

export interface JwtPayload {
  userId: string;
  address: string;
}

export interface Payload {
  address: string;
  userId: string;
}
