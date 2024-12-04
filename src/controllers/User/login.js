import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import bcrypt from "bcrypt";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing."));
    }

    const existingAccount = await User.findOne({ email });

    if (!existingAccount) {
      return res
        .status(404)
        .send(
          new ApiResponse(
            404,
            null,
            "Account does not exist. Kindly create one."
          )
        );
    }

    const verified = await bcrypt.compare(password, existingAccount.password);

    if (!verified) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Invalid credentials."));
    }

    const at = existingAccount.generateAccessToken();
    const rt = existingAccount.generateRefreshToken();

    res.cookie("at", at);
    res.cookie("rt", rt);

    res.send(
      new ApiResponse(
        200,
        { accessToken: at, refreshToken: rt },
        "User logged in successfully."
      )
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, null, "Failed to log user in."));
  }
};

export { loginUser };
