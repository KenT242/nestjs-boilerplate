export interface JwtSign {
  access_token: string;
  // refresh_token: string;
}

export interface JwtPayload {
  // sub: string;
  // username: string;
  // roles: string[];
  userId: string;
  address: string;
}

export interface Payload {
  // userId: string;
  // username: string;
  // roles: string[];
  address: string;
  userId: string;
}
