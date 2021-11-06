import passportLocal from "passport-local";
import { User } from "../../entity/user/User";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import { PassportStatic } from "passport";
const LocalStrategy = passportLocal.Strategy;
export default function passportConfig(passport: PassportStatic) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = getRepository(User);
      const userControl = (await user.findOne({ where: { username } })) as User;
      if (!userControl)
        return done(null, false, { message: "username incorrect" });
      const comparePass = await bcrypt.compare(password, userControl.password);
      if (!comparePass) done(null, false, { message: "password is wrong" });
      done(null, userControl);
    })
  );

  passport.serializeUser((user: any, done) => {
    try {
      done(null, user.id);
    } catch (err) {
      console.error(err);
    }
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = getRepository(User);
      const userControl = await user.findOne({ where: { id } });

      if (userControl) done(null, userControl);
    } catch (err) {
      console.error(err);
    }
  });
}
