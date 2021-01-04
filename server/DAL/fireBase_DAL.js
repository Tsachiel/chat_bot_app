const admin = require("firebase-admin");
const serviceAccount = require("../../my-final-project-295412-firebase-adminsdk-5ljuu-6997cf1463.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const docRef = db.collection("chat").doc("firstChat");

exports.sendData = async (name, data) => {
  let json = {
    [name]: data,
  };
  docRef.update(json);
};

exports.getData = async () => {
  const doc = await docRef.get();
  let data = doc.data();
  return data;
};
