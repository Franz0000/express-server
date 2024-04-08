exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.username;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};