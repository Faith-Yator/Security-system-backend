import { dbConfig } from "../config/config.js";
import sql from "mssql";

export const getUsers=async(req, res) =>{
    try {
        const connection = await sql.connect(dbConfig);
        const query = "SELECT * FROM SignIn";
        const contacts = await connection.request().query(query);
        res.json(contacts.recordset);
      } catch (error) {
        res.json(error);
      } finally {
        sql.close();
      }
};

export const getUser = async (req, res) => {
    try {
      const { id } = req.params;
      const query = "SELECT * FROM SignIn WHERE UserName = @UserName";
      const connection = await sql.connect(dbConfig);
      const user = await connection
        .request()
        .input("id", sql.Int, id)
        .query(query);
      res.json(user.recordset);
    } catch (error) {
      res.json(error);
    } finally {
      sql.close();
    }
  };

  export const newUsers = async (req, res) => {
    try {
      const {UserName,Password,Roles} =req.body
      const query =
        "INSERT INTO UserName(UserName,Password,Roles ) VALUES (@UserName,@Password,@Roles)";
      const connection = await sql.connect(dbConfig);
      await connection
        .request()
        .input("UserName", sql.VarChar,UserName )
        .input("Roles", sql.VarChar, Roles)
        .input("Password", sql.VarChar,Password)
       
        .query(query);
      res.json({ message: "User created successfully" });
    } catch (error) {
      res.json(error.message);
    } finally {
      sql.close();
    }
  };

  export const updateUser= async (req, res) => {
    try {
      const { UserName,Password,Roles} =
        req.body;
        const {id} = req.params
      const query =
        "UPDATE UserName SET UserName=@UserName,Password=@Password,Roles=@Roles";
      const connection = await sql.connect(dbConfig);
      await connection
        .request()
        .input("UserName", sql.VarChar,UserName )
        .input("Roles", sql.VarChar, Roles)
        .input("Password", sql.VarChar,Password)
        .query(query);
      res.json({ message: "User updated successfully" });
    } catch (error) {
      res.json(error.message);
    } finally {
      sql.close();
    }
  };

  export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const query = "DELETE FROM SignIn WHERE UserName = @UserName";
      const connection = await sql.connect(dbConfig);
      await connection.request().input("UserName", sql.VarChar, UserName).query(query);
      res.json({ message: "user deleted succucessfully" });
    } catch (error) {
      res.json(error.message);
    } finally {
      sql.close();
    }
  };