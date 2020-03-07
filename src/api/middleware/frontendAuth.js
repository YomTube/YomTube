import jwt from 'jsonwebtoken';
import User from '../../models/user';

const authUrls = [
	'/me',
	'/upload'
]

const frontendAuth = async (req, res, next) => {
	if (!req.url.startsWith('/client/')) {
		console.log("Request IP:", req.headers['x-forwarded-for'] || req.connection.remoteAddress)
		console.log("Got URL:", req.originalUrl)
		if (authUrls.includes(req.originalUrl)) {
			try {
				let cookies = req.header('cookie');
				if (!cookies) throw new Error("No cookie");

				let tokenCookie = cookies.split(";").filter(c => c.startsWith("token"));
				if (tokenCookie.length == 0) throw new Error("No token")

				let token = tokenCookie[0].split("=")[1];
				const data = jwt.verify(token, process.env.JWT_SECRET);
				console.log(data._id, token)
				const user = await User.findOne({ _id: data._id, 'tokens.token': token })
				if (!user) throw new Error("No user");
			} catch (err) {
				console.error(err)
				return res.redirect('/login')
			}
		} else {
			console.log("authUrls doesn't include")
		}
	}
	next();
}

export default frontendAuth;