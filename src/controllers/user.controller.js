import { loginUser } from "./User/login.js";
import { registerUser } from "./User/register.js";
import { resetPassword } from "./User/reset.js";

const userController = {
  register: registerUser,
  login: loginUser,
  reset: resetPassword,
};

export { userController };
