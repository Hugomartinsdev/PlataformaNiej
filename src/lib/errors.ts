export class UnauthorizedError extends Error {
  status = 401;
  message = "Unauthorized access";
}

export class UserNotFoundError extends Error {
  status = 404;
  message = "User not found";
}

export class ForbiddenError extends Error {
  status = 403;
  message =
    "Forbidden access: You don`t have permission to access this resource";
}

export class PasswordError extends Error {
  status = 401;
  message = "Invalid password";
}

export class InternalServerError extends Error {
  status = 500;
  message = "Internal server error";
}
