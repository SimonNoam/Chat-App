const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const userNameCheck = await User.findOne({ username })
        if (userNameCheck)
            return res.json({ msg: "Username already in use", status: false });
        const emailCheck = await User.findOne({ email });
        if (emailCheck)
            return res.json({ msg: "Email already in use", status: false });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({ status: true, user })
    } catch (err) {
        next(err);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username })
        if (!user) {

            return res.json({ msg: "Inncorrect Username or password", status: false });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ msg: "Inncorrect Username or password", status: false });
        }
        const updatedUser = await User.findOneAndUpdate(
            { username: username },
            { connected: true },
            { new: true }
        );

        delete updatedUser.password;

        const accessToken = jwt.sign(
            { id: updatedUser._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: 86400 } // 24 hours
        );

        return res.json({
            status: true,
            user: updatedUser,
            accessToken: accessToken
        });

    } catch (err) {
        next(err);
    }
};

module.exports.logout = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const user = await User.findByIdAndUpdate(userId, {
            connected: false,
        },
            { new: true }
        );
        if (!user) {
            return res.json({ msg: "not allow", status: false });
        }
        return res.json({ status: true, user: user });
    } catch (err) {
        return next(err);
    }
};

module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImagesSet: true,
            avatarImage
        },
            { new: true }
        );
        return res.json({
            isSet: userData.isAvatarImagesSet,
            image: userData.avatarImage,
        });

    } catch (ex) {
        next(ex);
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email", "username", "avatarImage", "_id", "connected"
        ]);
        return res.json(users)
    } catch (ex) {
        next(ex);
    }
};