// const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const crypto = require("crypto");

module.exports = (app) => {
  // app.get(
  //   "/auth/google",
  //   passport.authenticate("google", {
  //     scope: ["profile", "email"],
  //   })
  // );

  // app.get(
  //   "/auth/google/callback",
  //   passport.authenticate("google"),
  //   (req, res) => {
  //     res.redirect("http://localhost:3000/");
  //   }
  // );

  // app.get("/api/logout", (req, res) => {
  //   req.logout();
  //   res.redirect("/");
  // });

  // app.get("/api/current_user", (req, res) => {
  //   res.send(req.user);
  // });

  app.post("/api/createuser", async (req, res) => {
    try {
      const user = new User({
        email: "email@samsung.com",
        gen: "input gen",
        position: "choose position",
        password: "123",
        roles: ["up_submition"],
        group: "change group",
        part: "choose part",
      });
      const result = await user.save();
      const token = jwt.sign({ userId: user._id }, keys.jwtKey);
      res.status(200).json({
        status: true,
      });
    } catch (err) {
      console.log(`Create user err: ${err}`);
      res.status(422).json({ error: err });
    }
  });

  app.post("/api/deleteuser", async (req, res) => {
    try {
      const { _id } = req.body;
      const response = await User.findOneAndDelete({ _id });
      res.status(200).json({
        status: true,
      });
    } catch (err) {
      console.log(`Create user err: ${err}`);
      res.status(422).json({ error: err });
    }
  });

  app.post("/auth/signup", async (req, res) => {
    const { email, gen, password } = req.body;
    let position = "";
    let roles = [];
    let group = "";
    try {
      if (
        (email === "pham.bac@samsung.com" && gen === "14503330") ||
        (email === "giang.ng@samsung.com" && gen === "14502623") ||
        (email === "hung.nghiem@samsung.com" && gen === "09525725")
      ) {
        position = "Shift leader";
        roles = ["up_submition", "up_approval", "iv_item_count"];

        switch (email) {
          case "pham.bac@samsung.com":
            group = 1;
          case "giang.ng@samsung.com":
            group = 2;
          case "hung.nghiem@samsung.com":
            group = 3;
          default:
        }
      } else if (email === "chu.hung@samsung.com" && gen === "11556749") {
        position = "Part leader";
        roles = roles = ["up_submition", "up_approval", "iv_item_count"];
      } else {
        position = "Staff";
        roles = roles = ["up_submition"];
      }
      const user = new User({ email, gen, password, position, roles, group });
      const result = await user.save();
      const token = jwt.sign({ userId: user._id }, keys.jwtKey);
      res.status(200).json({
        part: user.part,
        position: user.position,
        email: user.email,
        gen: user.gen,
        name: user.name,
        token,
        roles: user.roles,
        group: user.group,
        status: user.status,
      });
    } catch (err) {
      console.log(`Sign up err: ${err}`);
      res.status(422).json({ error: err });
    }
  });

  app.post("/api/userinfo", async (req, res) => {
    try {
      // const user = await User.findOne({ email });
      res.status(200).json(req.user);
    } catch (err) {
      console.log(`Get user info err: ${err}`);
      res.status(422).json({ error: err });
    }
  });

  app.post("/api/updateuser", async (req, res) => {
    try {
      const { newuser } = req.body;
      const { _id, email, part, position, roles, status, gen, group } = newuser;
      const user = await User.findOneAndUpdate(
        { _id },
        { email, part, position, roles, status, gen, group }
      );
      res.status(200).json({ status: true, user });
    } catch (err) {
      console.log(`Set biometric status err: ${err}`);
      res.status(422).json({ status: false, error: err });
    }
  });

  app.post("/api/setbiopubkey", async (req, res) => {
    try {
      // console.log(req.user);
      const { email, bioPubkey } = req.body;
      const user = await User.findOneAndUpdate({ email }, { bioPubkey });
      res.status(200).json({ status: true, user });
    } catch (err) {
      console.log(`Set biometric status err: ${err}`);
      res.status(422).json({ status: false, error: err });
    }
  });

  app.post("/api/delbiopubkey", async (req, res) => {
    try {
      // console.log(req.user);
      const { email } = req.body;
      const user = await User.findOneAndUpdate({ email }, { bioPubkey: null });
      res.status(200).json({ status: true, user });
    } catch (err) {
      console.log(`Delete biometric status err: ${err}`);
      res.status(422).json({ status: false, error: err });
    }
  });

  app.post("/api/getbiopubkey", async (req, res) => {
    try {
      // console.log(req.user);
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (user && user.bioPubkey) {
        res.status(200).json({ status: true, bioPubkey: user.bioPubkey });
      } else {
        res.status(200).json({ status: true, bioPubkey: null });
      }
    } catch (err) {
      console.log(`Get biometric status err: ${err}`);
      res.status(422).json({ status: false, error: err });
    }
  });

  app.post("/api/bioverify", async (req, res) => {
    try {
      const { signature, email } = req.body;
      const user = await User.findOne({ email });
      let publicKey = `-----BEGIN PUBLIC KEY-----\n${user.bioPubkey}\n-----END PUBLIC KEY-----`;
      let verifier = crypto.createVerify("sha256");
      verifier.update(email);
      res.status(200).json({
        status: true,
        verified: verifier.verify(publicKey, signature, "base64"),
      });
    } catch (err) {
      console.log(`Err: ${err}`);
      res.status(422).json({ error: err });
    }
  });

  app.post("/auth/approveauth", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).send({ error: "Vui lòng nhập mật khẩu" });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(422).send({ error: "Không tìm thấy người dùng" });
      }
      await user.comparePassword(password);
      const token = jwt.sign({ userId: user._id }, keys.jwtKey);
      res.status(200).json({
        status: true,
      });
    } catch (err) {
      // console.log(`Sign in err: ${err}`);
      return res.status(422).send({ error: "Mật khẩu không đúng" });
    }
  });

  app.post("/auth/signin", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).send({ error: "Must provide email and password" });
    }

    try {
      const user = await User.findOne({ email, status: 1 });
      if (!user) {
        return res.status(422).send({ error: "User not found" });
      }
      await user.comparePassword(password);
      const token = jwt.sign({ userId: user._id }, keys.jwtKey);
      res.status(200).json({
        part: user.part,
        position: user.position,
        email: user.email,
        gen: user.gen,
        name: user.name,
        token,
        roles: user.roles,
        group: user.group,
        status: user.status,
      });
    } catch (err) {
      console.log(`Sign in err: ${err}`);
      return res.status(422).send({ error: "Invalid password or email" });
    }
  });

  app.post("/api/getusers", async (req, res) => {
    const { position, group, status } = req.body;
    try {
      const users = await User.find({ email: { $ne: "admin" } }).select(
        "part position email gen roles group status"
      );
      if (!users) {
        return res.status(422).send({ error: "Get users error!" });
      }
      res.status(200).json({ status: true, users });
    } catch (err) {
      return res.status(422).send({ error: "Get users error!" });
    }
  });

  app.post("/api/checkpwd", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).send({ error: "Must provide email and password" });
    }
    try {
      const user = await User.findOne({ email, status: 1 });
      if (!user) {
        return res.status(422).send({ error: "User not found" });
      }
      await user.comparePassword(password);
      res.status(200).json({
        status: true,
      });
    } catch (err) {
      console.log(`Check password error: ${err}`);
      return res.status(422).send({ error: "Mật khẩu cũ không đúng" });
    }
  });

  app.post("/api/changepwd", async (req, res) => {
    const { email, password, newPassword } = req.body;
    if (!email || !password) {
      return res.status(422).send({ error: "Must provide email and password" });
    }
    try {
      const user = await User.findOne({ email, status: 1 });
      await user.comparePassword(password);
      user.password = newPassword;
      await user.save();

      res.status(200).json({
        status: true,
      });
    } catch (err) {
      console.log(`Change password error: ${err}`);
      return res.status(422).send({ error: "Change password error" });
    }
  });

  //// SEV Mobile

  app.post("/auth/login", async (req, res) => {
    try {
      res.status(200).json({
        token: "LOGIN_TOKEN",
        msg: "success",
      });
    } catch (err) {
      console.log(`Sign in err: ${err}`);
      return res.status(422).send({ error: "Invalid password or email" });
    }
  });

  app.post("/auth/logout", async (req, res) => {
    try {
      res.status(200).json({
        msg: "success",
      });
    } catch (err) {
      console.log(`Sign in err: ${err}`);
      return res.status(422).send({ error: "Invalid password or email" });
    }
  });

  app.get("/api/menu", async (req, res) => {
    try {
      res.status(200).json({
        menus: [
          {
            id: 1,
            label: "DESIGNER",
            order: "00000",
            pageid: "P1",
            route: "/",
          },
          {
            id: 6,
            label: "ULTILITIES",
            order: "00000",
            pageid: "P6",
          },
          {
            id: 7,
            label: "COMPLEX",
            order: "00000",
            pageid: "P7",
            parent_id: 6,
          },
          {
            id: 8,
            label: "Complex01",
            order: "00000",
            pageid: "P8",
            route: "/8/page/template/Complex/Complex01",
            parent_id: 7,
          },
          {
            id: 9,
            label: "Complex02",
            order: "00000",
            pageid: "P9",
            route: "/9/page/template/Complex/Complex02",
            parent_id: 7,
          },
          {
            id: 10,
            label: "SPLIT",
            order: "00000",
            pageid: "P10",
            parent_id: 6,
          },
          {
            id: 11,
            label: "Split01",
            order: "00000",
            pageid: "P11",
            route: "/11/page/template/Split/Split01",
            parent_id: 10,
          },
          {
            id: 12,
            label: "Split02",
            order: "00000",
            pageid: "P12",
            route: "/12/page/template/Split/Split02",
            parent_id: 10,
          },
          {
            id: 13,
            label: "Split03",
            order: "00000",
            pageid: "P13",
            route: "/13/page/template/Split/Split03",
            parent_id: 10,
          },
          {
            id: 14,
            label: "STACK",
            order: "00000",
            pageid: "P14",
            parent_id: 6,
          },
          {
            id: 15,
            label: "Stack01",
            order: "00000",
            pageid: "P15",
            route: "/15/page/template/Stack/Stack01",
            parent_id: 14,
          },
          {
            id: 16,
            label: "Stack02",
            order: "00000",
            pageid: "P16",
            route: "/16/page/template/Stack/Stack02",
            parent_id: 14,
          },
          {
            id: 17,
            label: "Stack03",
            order: "00000",
            pageid: "P17",
            route: "/17/page/template/Stack/Stack03",
            parent_id: 14,
          },
        ],
      });
    } catch (err) {
      console.log(`Sign in err: ${err}`);
      return res.status(422).send({ error: "Invalid password or email" });
    }
  });
};
