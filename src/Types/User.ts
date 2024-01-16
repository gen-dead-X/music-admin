export type LogInType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type SignUpType = {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  confirmPassword: string;
};

export type ApiResponse = {
  success: boolean;
  message: string;
};

export type Profile = {
  userType: string;
  name: string;
  email: string;
  phoneNumber: string;
  id: string;
};

export type LoginResponse = ApiResponse & {
  data: {
    userDetails: Profile;
    accessToken: string;
    refreshToken: string;
  };
};
