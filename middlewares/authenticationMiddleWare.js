exports.authenticate = (request, response, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
	  try {
	    const decoded = jwt.verify(token, secretKey);
	    request.user = decoded.username;
	    next();
	  } catch (error) {
	    response.status(403).json({ message: 'Invalid token' });
	  }
};