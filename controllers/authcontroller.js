import { dbConfig } from "../config/config.js";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

export const SignIn = async (req, res) => {
  try {
    const connection = await sql.connect(dbConfig);
    const { UserName, Password, Roles } = req.body;

    const query1 = "SELECT * FROM SignIn WHERE UserName = @UserName";
    const results = await connection
      .request()
      .input("UserName", sql.VarChar, UserName)
      .query(query1);

    if (results.recordset.length > 0) {
      return res.json({
        message: "A person with the provided username already exists. Please log in with your account.",
      });
    }

    if (!Password) {
      return res.json({ message: "Password is required!" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const query2 =
      "INSERT INTO SignIn (UserName, Password, Roles) VALUES (@UserName, @Password, @Roles)";
    await connection
      .request()
      .input("UserName", sql.VarChar, UserName)
      .input("Password", sql.VarChar, hashedPassword)
      .input("Roles", sql.VarChar, Roles)
      .query(query2);

    res.json({ message: "Account created!" });
  } catch (error) {
    res.json(error.message);
  }
};


export const Register = async (req, res) => {
  try {
    const connection = await sql.connect(dbConfig);
    const { UserName, Password } = req.body;

    const query1 = "SELECT * FROM SignIn WHERE UserName = @ UserName";
    const results = await connection
      .request()
      .input("UserName", sql.VarChar,  UserName)
      .input("Password", sql.VarChar,  Password)
      .query(query1);

    if (!results.recordset[0]) {
      return res.json({ message: "Account doesn't exist. Please create one." });
    }

    const hashedPassword = results.recordset .length>0;
    const validPassword = bcrypt.compareSync(data, hashedPassword);

    if (!validPassword) {
      return res.json({ message: "Incorrect password" });
    }

    const payload = results.recordset.map((user) => {
      const { Password, ...rest } = user;
      return { ...rest };
    });

    const { JWT_SECRET } = process.env;
    const token = jwt.sign(payload[0], JWT_SECRET);

    res.json({ message: "Registered in successfully", token });
  } catch (error) {
    res.json(error.message);
  }
};
