export type LoginResponse = {
  success: boolean;
};

export type UserProfile = {
  email: string;
};

export type UserProfileResponse = {
  user: UserProfile;
};
