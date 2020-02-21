import jwt from 'jsonwebtoken';
import User from '../../models/user';

const authUrls = [
	'/me',
	'/upload'
]

const frontendAuth = async (req, res, next) => {
	if (!req.url.startsWith('/client/')) {
		console.log("Request IP:", req.headers['x-forwarded-for'] || req.connection.remoteAddress)
		if (authUrls.includes(req.originalUrl)) {
			console.log("Got auth URL:", req.originalUrl)
			try {
				let cookies = req.header('cookie');
				if (!cookies) throw new Error();

				let tokenCookie = cookies.split(";").filter(c => c.startsWith("token"));
				if (tokenCookie.length == 0) throw new Error()

				let token = tokenCookie[0].split("=")[1];
				const data = jwt.verify(token, process.env.JWT_SECRET);
				const user = await User.findOne({ _id: data._id, 'tokens.token': token })
				if (!user) throw new Error();
			} catch (err) {
				return res.redirect('/login')
			}
		}
	}
	next();
}

export default frontendAuth;