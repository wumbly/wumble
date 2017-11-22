const User = require('../../db/models/user');

let helpers = {};

helpers.signup = async function(data) {
	const [user] = await User.find({ username: data.username }, 'username password').exec();
	if (user == null) {
		const newUser = new User({
			username: data.username,
			password: User.generateHash(data.password),
		});
		const result = await newUser.save();
		return 'SERVER: Signup successful.';
	} else {
		return `SERVER: User ${data.username} already exists.`;
	}
};

helpers.login = async function(data, callback) {
	const [user] = await User.find({ username: data.username }, 'username password').exec();
	if (user == null) {
		return `SERVER: User ${data.username} not found.`;
	} else {
		const res = await User.validatePassword(data.password, user.password);
		if (res) return `SERVER: Login successful.`;
		return `SERVER: Password does not match.`;
	}
};

module.exports = helpers;
