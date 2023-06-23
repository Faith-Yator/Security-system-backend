import { dbConfig } from "../config/config.js";
import sql from "mssql";

export const getNewslaters=async(req, res) =>{
    try {
        const connection = await sql.connect(dbConfig);
        const query = "SELECT * FROM Newslater";
        const contacts = await connection.request().query(query);
        res.json(contacts.recordset);
      } catch (error) {
        res.json(error);
      } finally {
        sql.close();
      }
};

export const getNewslater = async (req, res) => {
    try {
      const { id } = req.params;
      const query = "SELECT * FROM Newslater WHERE Newslaterid = @Newslaterid";
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

  export const newNewslaters = async (req, res) => {
    try {
      const {Newslaterid, Name,Email } =req.body
      const query =
        "INSERT INTO Newslater( Newslaterid,Name,Email) VALUES (@Newslaterid,@Name,@Email)";
      const connection = await sql.connect(dbConfig);
      await connection
        .request()
        .input("Name", sql.VarChar,Name )
        .input("Email", sql.VarChar, Email)
        .input("Newslaterid", sql.VarChar,Newslaterid)
       
        .query(query);
      res.json({ message: "Newslater created successfully" });
    } catch (error) {
      res.json(error.message);
    } finally {
      sql.close();
    }
  };

  export const updateNewslater= async (req, res) => {
    try {
      const { Newslaterid,Name,Email} =
        req.body;
        const {id} = req.params
      const query =
        "UPDATE Newslater SET Newslaterid=@Newslaterid,Name=@Name,Email=@Email";
      const connection = await sql.connect(dbConfig);
      await connection
        .request()
        .input("Name", sql.VarChar,Name )
        .input("Email", sql.VarChar, Email)
        .input("Newslaterid", sql.VarChar,Newslaterid)
        .query(query);
      res.json({ message: "Newslater updated successfully" });
    } catch (error) {
      res.json(error.message);
    } finally {
      sql.close();
    }
  };

  export const deleteNewslater = async (req, res) => {
    try {
      const { id } = req.params;
      const query = "DELETE FROM Newslater WHERE Name = @Name";
      const connection = await sql.connect(dbConfig);
      await connection.request().input("Name", sql.VarChar, Name).query(query);
      res.json({ message: "Contact  deleted succucessfully" });
    } catch (error) {
      res.json(error.message);
    } finally {
      sql.close();
    }
  };