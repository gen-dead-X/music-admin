export type LogInType = {
  email: string;
  password: string;
};

export type SignUpType = LogInType & {
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
