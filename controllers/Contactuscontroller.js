import { dbConfig } from "../config/config.js";
import sql from "mssql";

export const getContactuss=async(req, res) =>{
    try {
        const connection = await sql.connect(dbConfig);
        const query = "SELECT * FROM ContactUs";
        const Contactus = await connection.request().query(query);
        res.json(Contactus.recordset);
      } catch (error) {
        res.json(error);
      } finally {
        sql.close();
      }
};

export const getContactus = async (req, res) => {
    try {
      const { id } = req.params;
      const query = "SELECT * FROM ContactUs WHERE Contactusid = @Contactusid";
      const connection = await sql.connect(dbConfig);
      const Contactusid = await connection
        .request()
        .input("Contactusid", sql.VarChar, Contactusid)
        .query(query);
      res.json(user.recordset);
    } catch (error) {
      res.json(error);
    } finally {
      sql.close();
    }
  };

  export const newContactuss = async (req, res) => {
    try {
      const {FirstName,LastName,PhoneNumber,Email,Location,Contactusid } =req.body
      const query =
        "INSERT INTO   ContactUs(FirstName,LastName,PhoneNumber,Email,Location,Contactusid  ) VALUES (@FirstName,@LastName,@PhoneNumber,@Email,@Location,@Contactusid )";
      const connection = await sql.connect(dbConfig);
      await connection
        .request()
        .input("FirstName", sql.VarChar, FirstName)
        .input("LastName", sql.VarChar, LastName)
        .input("PhoneNumber", sql.VarChar, PhoneNumber)
        .input("Email", sql.VarChar, Email)
        .input("Location", sql.VarChar, Location)
        .input("Contactusid", sql.VarChar,Contactusid )
        .query(query);
      res.json({ message: "ContactUs created successfully" });
    } catch (error) {
      res.json(error.message);
    } finally {
      sql.close();
    }
  };

  export const updateContactus = async (req, res) => {
    try {
      const {FirstName,LastName,PhoneNumber,Email,Location,Contactusid } =
        req.body;
        const {id} = req.params
      const query =
        "UPDATE ContactUs SET FirstName=@FirstName,LastName=@LastName,PhoneNumber=@PhoneNumber,Email=@Email,Location=@Location,Contactusid=@Contactusid ";
      const connection = await sql.connect(dbConfig);
      await connection
        .request()
        .input("Contactusid", sql.VarChar,Contactusid )
        .input("FirstName", sql.VarChar, FirstName)
        .input("LastName", sql.VarChar, LastName)
        .input("PhoneNumber", sql.VarChar, PhoneNumber)
        .input("Email", sql.VarChar, Email)
        .input("Location", sql.VarChar, Location)
        .query(query);
      res.json({ message: "Contact updated successfully" });
    } catch (error) {
      res.json(error.message);
    } finally {
      sql.close();
    }
  };

  export const deleteContactus = async (req, res) => {
    try {
      const { Contactusid } = req.params;
      const query = "DELETE FROM ContactUs WHERE id = @id";
      const connection = await sql.connect(dbConfig);
      await connection.request().input("Contactusid", sql.VarChar, Contactusid).query(query);
      res.json({ message: "Contactus  deleted succucessfully" });
    } catch (error) {
      res.json(error.message);
    } finally {
      sql.close();
    }
  };