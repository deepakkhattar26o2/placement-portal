export interface AccountPatchRequest {
  id: number;
  name?: string;
  email?: string;
  website?: string;
  about?: string;
}
export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}
