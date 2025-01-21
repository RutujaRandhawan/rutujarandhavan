
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();
const db = admin.firestore();

export const getUsers = functions.https.onRequest(async (req, res) => {
  const snapshot = await db.collection('users').get();
  const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.status(200).json(users);
});

export const addUser = functions.https.onRequest(async (req, res) => {
  const user = req.body;
  const docRef = await db.collection('users').add(user);
  res.status(201).json({ id: docRef.id });
});

export const updateUser = functions.https.onRequest(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  await db.collection('users').doc(id).update(updatedData);
  res.status(200).send('User updated');
});

export const deleteUser = functions.https.onRequest(async (req, res) => {
  const { id } = req.params;
  await db.collection('users').doc(id).delete();
  res.status(200).send('User deleted');
});
