const contactUs = require("../models/contactUs");

exports.ContactUs = async (req, res) => {
    try {
        let { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All Fields are Mandatory",
            });
        }

        // Check if the user already exists in the database
        let inquirer = await contactUs.findOne({ email });

        if (!inquirer) {
            // If the user doesn't exist, create a new contact entry
            const data = await contactUs.create({ name, email, message: [message] });
            return res.status(200).json({
                success: true,
                data: data,
                message: "Contact Entry Created Successfully",
            });
        } else {
            // If the user already exists, update the existing contact entry
            inquirer.message.push(message); // Push the new message to the message array
            await inquirer.save(); // Save the updated document
            return res.status(200).json({
                success: true,
                data: inquirer,
                message: "Message Added Successfully",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
