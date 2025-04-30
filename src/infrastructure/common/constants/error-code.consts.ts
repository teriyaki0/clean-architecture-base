enum AUTH {
  USER_NOT_FOUND = 'User not found.',
  INVALID_CREDENTIALS = 'Invalid email or password.',
  EMAIL_ALREADY_EXISTS = 'User with this email already exists.',
  FORBIDDEN = 'Forbidden: insufficient permissions.',
  UNAUTHORIZED = 'Unauthorized: authentication required.',
}

export const ERROR = {
  AUTH,
};
