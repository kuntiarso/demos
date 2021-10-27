import { NextApiRequest, NextApiResponse } from 'next'
import { auth } from '../../lib/firebase-admin'
import { addOrder, getOrders } from '../../utils/db'

const SubmitForm = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      await insert(req, res)
      break
    // case 'GET':
    //   await fetch(req, res)
    //   break
    default:
      res.status(405).json({ status: false, message: 'Method Not found' })
      break
  }
}

const insert = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await auth.verifyIdToken(req.headers.token as string)
    const data = { ...req.body, userId: user.uid }
    await addOrder(data)
    return res
      .status(200)
      .json({ status: true, message: 'Drink added successfully' })
  } catch (e) {
    return res
      .status(500)
      .json({ status: false, message: 'Something went wrong' })
  }
}

// const fetch = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     await auth.verifyIdToken(req.headers.token as string)
//     const res = await getOrders()
//     return res;
//   } catch (e) {
//     return res
//       .status(500)
//       .json({ status: false, message: 'Something went wrong' })
//   }
// }

export default SubmitForm