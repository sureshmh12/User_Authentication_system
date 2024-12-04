import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing."));
    }

    const alreadyExists = await User.findOne({ email });

    if (alreadyExists) {
      return res
        .status(409)
        .send(
          new ApiResponse(
            409,
            null,
            "User account already exists. Kindly login with your credentials."
          )
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const at = createdUser.generateAccessToken();
    const rt = createdUser.generateRefreshToken();

    res.cookie("at", at);
    res.cookie("rt", rt);

    res.send(
      new ApiResponse(
        201,
        { accessToken: at, refreshToken: rt },
        "User account registered successfully."
      )
    );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to register user account."));
  }
};

export { registerUser };
