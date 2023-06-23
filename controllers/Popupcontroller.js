import { dbConfig } from "../config/config.js";
import sql from "mssql";


export const getPopups=async(req, res) =>{
    try {
        const connection = await sql.connect(dbConfig);
        const query = "SELECT * FROM Popup";
        const Popup = await connection.request().query(query);
        res.json(Popup.recordset);
      } catch (error) {
        res.json(error);
      } finally {
        sql.close();
      }
};

export const getPopup = async (req, res) => {
    try {
      const { id } = req.params;
      const query = "SELECT * FROM Popup WHERE Popupid = @Popupid";
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

  export const newPopups = async (req, res) => {
    try {
      const { Popupid,Message,Location} =req.body
      const query =
        "INSERT INTO Popup (Popupid,Message,Location ) VALUES (@Popupid,@Message,@Location)";
      const connection = await sql.connect(dbConfig);
      await connection
        .request()
        .input("Popupid", sql.VarChar,Popupid)
        .input("Message", sql.VarChar,Message)
        .input("Location", sql.VarChar, Location)
        .query(query);
      res.json({ message: "Popup created successfully" });
    } catch (error) {
      res.json(error.message);
    } finally {
      sql.close();
    }
  };

  export const updatePopup = async (req, res) => {
    try {
      const {Message,Location } =
        req.body;
        const {id} = req.params
      const query =
        "UPDATE Popup SET @Popupid,@Message,@Location";
      const connection = await sql.connect(dbConfig);
      await connection
        .request()
        .input("Popupid", sql.VarChar,Popupid)
        .input("Message", sql.VarChar,Message)
        .input("Location", sql.VarChar, Location)
        .query(query);
      res.json({ message: "Contact updated successfully" });
    } catch (error) {
      res.json(error.message);
    } finally {
      sql.close();
    }
  };

  export const deletePopup = async (req, res) => {
    try {
      const { id } = req.params;
      const query = "DELETE FROM Popup WHERE Location = @Location";
      const connection = await sql.connect(dbConfig);
      await connection.request().input("Location", sql.VarChar, Location).query(query);
      res.json({ message: "Popup  deleted succucessfully" });
    } catch (error) {
      res.json(error.message);
    } finally {
      sql.close();
    }
  };