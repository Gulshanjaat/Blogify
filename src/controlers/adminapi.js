const adminmodel = require("../models/adminmodel")

const addadmin = async (req, res) => {
    try {
        const { name, email } = req.body

        const addadmin = new adminmodel({ name, email })

        addadmin.save()
        res.send({ status: true, message: "admin add successfully", addadmin })


    }
    catch {
        res.send({ status: false, message: "error adding admin" })

    }

}

module.exports = addadmin