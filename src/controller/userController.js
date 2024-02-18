const client = require("../config/config.js");
const UserDAO = require("../dao/userDAO.js")(client);

const getAllUser = async (req, res) => {
    try {
        const results = await UserDAO.findAll();
        if (results.length === 0) {
            res.status(404).json({ message: 'No users found' });
        } else {
            res.status(200).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while getting users' });
    }
};

const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const results = await UserDAO.findOne(id);
        if (results.length === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while getting the user by ID' });
    }
}

const createUser = async (req, res) => {
    try {
        const results = await UserDAO.save(req.body);
        if (results.length === 0) {
            res.status(400).json({ message: 'User could not be created' });
        } else {
            res.status(201).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
}

const updateUser = async (req, res) => {
    const user = {
        "id" : req.params.id, 
        "name":req.body.name, 
        "email":req.body.email
    };
    try {
        const results = await UserDAO.updateOne(user);
        if (results.length === 0) {
            res.status(400).json({ message: 'User could not be updated' });
        } else {
            res.status(200).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating the user' });
    }
}

const deleteUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const results = await UserDAO.deleteOne(id);
        if (results.length === 0) {
            res.status(404).json({ message: `User not found` });
        } else {
            res.status(204).end();
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
};


module.exports = {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUserById,
};
