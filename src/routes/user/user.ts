import { Request, Response, Router } from "express";
import { IUser } from "../../utils/interfaces/IUser";
import { User } from "../../entity/user/User";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import checkJoi from "../../middleware/checkJoi";
import { loginValidation, registerValidation } from "./userValidation";
import passport from "passport";
import isLoggedin from "../../middleware/auth";
const router = Router();
//#region
const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, username, age, role, password }: IUser =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = getRepository(User);

    if (await user.findOne({ where: { username } }))
      res.send("user already exists");

    user.save({
      firstName,
      lastName,
      username,
      age,
      role,
      password: hashedPassword,
    });
    res.status(200).json({ outcome: "OK" });
  } catch (error) {
    console.error(error);
  }
};

async function getUser(req: Request, res: Response) {
  try {
    res.json(req.user);
  } catch (err) {
    console.error(err);
  }
}
//#endregion

//#region
/** +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *                              ROUTES ENDPOINTS
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
router.post("/create", checkJoi(registerValidation), createUser);

router.post(
  "/login",
  checkJoi(loginValidation),
  passport.authenticate("local", {
    successMessage: "you logined successfully",
    failureMessage: "login failed",
  }),
  (_req: Request, res: Response) => {
    res.send("signed in successfully");
  }
);
router.get("/", isLoggedin, getUser);
//#endregion
export default router;
