const express = require('express')
const router = express.Router()
const cors = require('cors')

const { test, registerUser, loginUser, getProfile, logOutUser, getUserInfo } = require('../controllers/authController')

//Middelware creation using cors
router.use(
    cors(
        {
            credentials: true,
            origin: 'http://localhost:5173'

        }

    )
)

// you can use req, res over here but to create clean code we will use a function that does that for us

router.get('/', test)

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logOutUser)
router.get('/profile', getProfile)
router.get('/:id', getUserInfo)
// Always export when creating routes 
module.exports = router