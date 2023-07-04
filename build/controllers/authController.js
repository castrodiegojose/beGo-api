"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.signin = exports.signup = void 0;
const user_1 = __importDefault(require("../models/user"));
const default_1 = __importDefault(require("../config/default"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // saving user //
    const user = new user_1.default({
        email: req.body.email,
        password: req.body.password
    });
    const userCheckifExist = yield user_1.default.findOne({ email: req.body.email });
    if (userCheckifExist)
        return res.status(400).json(`Already exists the user ${userCheckifExist.email}`);
    user.password = yield user.encryptPassword(user.password);
    const savedUser = yield user.save();
    // token
    // const token:string = jwt.sign({_id: savedUser._id}, config.TOKEN_SECRET_KEY || "tokenSecretKey")
    res.status(200).json(savedUser);
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // check User
    const user = yield user_1.default.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).json('Email is wrong');
    //check Password
    const correctPass = yield user.validatePassword(req.body.password);
    if (!correctPass)
        return res.status(400).json('Password is wrong');
    //token
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, default_1.default.TOKEN_SECRET_KEY || "tokenSecretKey", {
        expiresIn: 60 * 60 * 24
    });
    res.header('auth-token', token).json(user);
});
exports.signin = signin;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(req.userId, { password: 0 });
    if (!user)
        return res.status(404).json("no User found");
    res.json(user);
});
exports.profile = profile;
//# sourceMappingURL=authController.js.map