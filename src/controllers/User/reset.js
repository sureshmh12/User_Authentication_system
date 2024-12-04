import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import bcrypt from "bcrypt";

const resetPassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;

    if (!email || !oldPassword || !newPassword || !confirmPassword) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing."));
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Passwords do not match."));
    }

    const existingAccount = await User.findOne({ email });

    if (!existingAccount) {
      return res
        .status(404)
        .send(
          new ApiResponse(
            404,
            null,
            "Account does not exist. Cannot reset password."
          )
        );
    }

    const verified = await bcrypt.compare(
      oldPassword,
      existingAccount.password
    );

    if (!verified) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Incorrect password."));
    }

    existingAccount.password = await bcrypt.hash(newPassword, 10);
    await existingAccount.save();

    res.send(new ApiResponse(200, null, "Password changed successfully."));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, null, "Failed to log user in."));
  }
};

export { resetPassword };