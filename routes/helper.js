import { client } from "../index.js";
import { ObjectId } from "mongodb";

//dress
export async function getDressById(id, res) {
  const result = await client
    .db("dress")
    .collection("dress")
    .findOne({ _id: ObjectId(id) });
  result ? res.send(result) : res.status(404).send({ error: "not found" });
}
export async function getAllDress(res) {
  const result = await client
    .db("dress")
    .collection("dress")
    .find({})
    .toArray();
  res.send(result);
}
export async function updateDressById(id, data, res) {
  const result = await client
    .db("dress")
    .collection("dress")
    .updateOne({ _id: ObjectId(id) }, { $set: data });
  res.send(result);
}
export async function deleteDressById(id, res) {
  const result = await client
    .db("dress")
    .collection("dress")
    .deleteOne({ _id: ObjectId(id) });
  result.deletedCount > 0
    ? res.send(result)
    : res.status(404).send({ error: "not found" });
}
export async function createDress(data, res) {
  const result = await client.db("dress").collection("dress").insertOne(data);
  res.send(result);
}



//signup User
// export async function createUser(data, res) {
//   const result = await client.db("dress").collection("users").insertOne(data);
//   res.send(result);
// }

// export async function getUserByName(username, res) {
//   const result = await client
//     .db("dress")
//     .collection("users")
//     .findOne({ username: username });
//   return result;
// }
