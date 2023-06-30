import { dbConfig } from "../config/config.js";
import jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt'
import sql from "mssql";
import dotenv from 'dotenv'
dotenv.config()



export const  Register= async (req, res) => {
  try {
    const connection = await sql.connect(dbConfig);
    const { UserName, Password, Roles } = req.body;

    if (!Password) {
      return res.json({ message: "Password is required!" });
    }

    const saltRounds = 10; // Define the number of salt rounds for bcrypt

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

    const hashedPassword = await bcrypt.hash(Password, saltRounds);

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


export const Login  = async (req, res) => {
  try {
    const connection = await sql.connect(dbConfig);
    const {UserName, Password} = req.body
    const query1 = "SELECT * FROM SignIn WHERE UserName = @UserName"
    const results = await connection
      .request()
      .input("UserName", sql.VarChar, UserName)
      .query(query1);
    if (!results.recordset[0]) {
      return res.json({ message: "Account doesnt exist, create one" });
    }
    const hashedpassword = results.recordset[0].Password
    const validpassword = bcrypt.compareSync(Password,hashedpassword)
    if(!validpassword){
        return res.json({message: "Incorrect password"})
    }
    const payload = results.recordset.map(user=> {
        const {Password, ...rest} = user
        return {...rest}
    })
    const {JWT_SECRET} = process.env
    const token = jwt.sign(payload[0], JWT_SECRET)
    res.json({message: "Logged in successfully", token})
  } catch (error) {
    res.json(error.message)
  }
};
export const loginRequired = (req, res, next) => {
  if (req.user) {
      next();
  } else {
      return res.status(401).json({ message: 'Unauthorized user!' });
  }
};


