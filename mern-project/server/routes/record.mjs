import express from "express";
import { getDb } from "../db/conn.mjs"; // MongoDB bağlantısını almak için
import { ObjectId } from "mongodb";

const router = express.Router();

// Tüm kayıtları getir
router.get("/", async (req, res) => {
  try {
    const db = getDb();
    const collection = db.collection("records");
    const results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).send({ error: "Failed to fetch records" });
  }
});

// Belirli bir kaydı ID ile getir
router.get("/:id", async (req, res) => {
  try {
    const db = getDb();
    const collection = db.collection("records");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);

    if (!result) {
      res.status(404).send({ message: "Record not found" });
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    console.error("Error fetching record:", error);
    res.status(500).send({ error: "Failed to fetch record" });
  }
});

// Yeni bir kayıt oluştur
router.post("/", async (req, res) => {
  try {
    const newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };

    const db = getDb();
    const collection = db.collection("records");
    const result = await collection.insertOne(newDocument);

    res.status(201).send(result);
  } catch (error) {
    console.error("Error creating record:", error);
    res.status(500).send({ error: "Failed to create record" });
  }
});

// Belirli bir kaydı ID ile güncelle
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };

    const db = getDb();
    const collection = db.collection("records");
    const result = await collection.updateOne(query, updates);

    if (result.matchedCount === 0) {
      res.status(404).send({ message: "Record not found" });
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).send({ error: "Failed to update record" });
  }
});

// Belirli bir kaydı ID ile sil
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const db = getDb();
    const collection = db.collection("records");
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      res.status(404).send({ message: "Record not found" });
    } else {
      res.status(200).send({ message: "Record deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting record:", error);
    res.status(500).send({ error: "Failed to delete record" });
  }
});

export default router;

