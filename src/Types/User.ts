export type RememberMe = {
  rememberMe: string;
};

export type LogInType = RememberMe & {
  email: string;
  password: string;
};

export type SignUpType = {
  email: string;
  password: string;
  name: string;
  phoneNumber: number;
  confirmPassword: string;
};

export type Profile = {
  userType: string;
  name?: string;
  email: string;
  phoneNumber?: number;
};

export type LoginResponse = {
  userDetails: Profile;
  accessToken: string;
  refreshToken: string;
};
