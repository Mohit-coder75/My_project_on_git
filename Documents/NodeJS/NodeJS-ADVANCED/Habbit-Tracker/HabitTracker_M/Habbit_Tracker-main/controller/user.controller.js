import UserModel from "../model/userSchema.js";
// import ProductModel from "../models/product.model.js"; // Assuming this exists

export default class UserController {
    // Render register page
    getRegister(req, res) {
        res.render('register');
    }

    // Render login page
    getLogin(req, res) {
        res.render('login', { errorMessage: null });
    }

    // Handle registration
    async postRegister(req, res) {
        const { name, email, password } = req.body;

        // Ensure unique user by checking if email exists
        try {
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.render('register', { errorMessage: "User already exists" });
            }
            // Get the number of documents (users) in the collection
            const userCount = await UserModel.countDocuments();
            const id = userCount + 1; // Set id as count + 1

            const newUser = new UserModel({ id, name, email, password });
            await newUser.save();  // Save the new user to the DB
            res.render('login', { errorMessage: null });
        } catch (err) {
            res.status(500).send("Error registering user");
        }
    }

    // Handle login
    async postLogin(req, res) {
        const { email, password } = req.body;

        // Find the user in DB
        const user = await UserModel.findOne({ email, password });

        if (!user) {
            return res.render('login', { errorMessage: "Invalid Credentials" });
        }

        // Attaching session
        req.session.userEmail = email;

        const products = await ProductModel.find();  // Assuming ProductModel is also set up
        res.render('products', { products, userEmail: req.session.userEmail });
    }

    // Handle logout
    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/login');
            }
        });
        res.clearCookie('lastVisit');
    }
}
