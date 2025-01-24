import jwt = require('jsonwebtoken')

export const AppAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization']

  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res
      .status(401)
      .send({ message: 'Access denied. Token not provided.' })
  }

  try {
    req['member'] = jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized.' })
  }

  next()
}
