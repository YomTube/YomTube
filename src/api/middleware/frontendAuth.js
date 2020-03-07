import jwt from 'jsonwebtoken';
import User from '../../models/user';

const authUrls = [
	'/me',
	'/upload'
]

const frontendAuth = async (req, res, next) => {
	if (!req.url.startsWith('/client/')) {
		if (authUrls.includes(req.originalUrl)) {
			try {
				let cookies = req.header('cookie');
				if (!cookies) throw new Error("No cookie");

				let tokenCookie = cookies.split(";").filter(c => c.startsWith("token"));
				if (tokenCookie.length == 0) throw new Error("No token")

				let token = tokenCookie[0].split("=")[1];
				const data = jwt.verify(token, process.env.JWT_SECRET);
				const user = await User.findOne({ _id: data._id, 'tokens.token': token })
				if (!user) throw new Error("No user");
			} catch (err) {
				console.error(err)
				return res.redirect('/login')
			}
		}
	}
	next();
}

export default frontendAuth;