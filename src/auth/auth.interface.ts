export interface JwtSign {
  access_token: string;
  // refresh_token: string;
}

export interface IJwtUserPayload {
  address: string;
  ens?: string;
}

export interface JwtPayload {
  sub: string;
  user: IJwtUserPayload;
  address: string;
}

export interface Payload {
  address: string;
}
