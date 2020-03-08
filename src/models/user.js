import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { promises as fs } from 'fs';

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		validate: value => {
			if (!validator.isEmail(value)) {
				throw new Error("Invalid email address");
			}
		},
		required: true
	},
	password: {
		type: String,
		required: true,
		minlength: 8
	},
	profilePicture: {
		data: String,
		contentType: String
	},
	tokens: [
		{
			token: {
				type: String,
				required: true
			}
		}
	],
	videos: [
		{
			video: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Video"
			}
		}
	]
});

UserSchema.pre("save", async function (next) {
	const user = this;

	if (user.isModified("password"))
		user.password = await bcrypt.hash(user.password, 10);

	if (!user.profilePicture.data) {
		user.profilePicture = {
			data: Buffer.from(await fs.readFile(process.cwd() + '/static/images/stock-profile-pic.png')).toString('base64'),
			contentType: 'image/png'
		}
	}

	next();
});

UserSchema.methods.genJWTToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

UserSchema.statics.findUser = async (identifier = undefined, password) => {
	const user = await User.findOne({
		$or: [{ username: identifier }, { email: identifier }]
	});
	if (!user) throw new Error("Invalid login credentials");

	let passwordMatch = await bcrypt.compare(password, user.password);
	if (!passwordMatch) throw new Error("Invalid login credentials");

	return user;
};

const User = new mongoose.model("User", UserSchema);
export { User as default, UserSchema };
