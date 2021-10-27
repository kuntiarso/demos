import { NextApiRequest } from 'next'
import firebase from '../lib/firebase'

const addUser = async (authUser: any) => {
  const res = await firebase
    .firestore()
    .collection('users')
    .doc(authUser.uid as string)
    .set({ ...authUser }, { merge: true })
  return res
}

const addOrder = async (requestData: NextApiRequest) => {
  const res = await firebase.firestore().collection('drinks').add(requestData)
  return res
}

const getOrders = async () => {
  const res = await firebase.firestore().collection('drinks').get()
  const drinks = res.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  return drinks;
};

export { addUser, addOrder, getOrders }