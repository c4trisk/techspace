import express from 'express'
import { addLike, getLikedVenues, removeLike } from '../models/likesModel'
import { verifyToken } from '../authentication/auth'

const router = express.Router()

router.post('/', verifyToken, addLike)

router.get('/', verifyToken, getLikedVenues)

router.delete('/', verifyToken, removeLike)

export default router