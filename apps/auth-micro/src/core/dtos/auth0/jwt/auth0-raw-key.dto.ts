type KeyUse = 'sig' | 'enc' | 'desc';
export class RawKeyDTO {
  alg: string;
  kty: string;
  use: KeyUse;
  kid: string;

  // e and n make up the public key
  e: string;
  n: string;
}
