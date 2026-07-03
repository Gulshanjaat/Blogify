const moment = require("moment");
const adminmodel = require("../models/adminmodel");
const otpmodel = require("../models/otpmodel");
const sendmail = require("../utils/mailer");
const jwt = require("jsonwebtoken")


const sendemail = async (req, res) => {

  const { email } = req.body;
  const checkemail = await adminmodel.findOne({ email });


  if (!checkemail) {
    return res.send({ status: false, message: "admin not found" })
  }

  let otp = 2222

  await sendmail(email, `your otp is ${otp}`);
  let futureMoment = moment().add(8, "minutes");
  let finalTime = moment(futureMoment).valueOf()
  await otpmodel.create({ email, otp, expiry: finalTime })
  return res.send({ status: true, message: "otp send successfully" })

}


const verifyotp = async (req, res) => {

  try {

    let { otp, email } = req.body;

    let time = moment().valueOf()
    let check = await otpmodel.findOne({ email });

    if (!check) {
      return res.send({ status: false, message: "email not found" })

    }


    if (otp != check.otp) {
      return res.send({ status: false, message: "otp is incorrect" })
    }

    if (time > check.expiry) {
      return res.send({ status: false, message: "otp expired" })
    }


    check.is_verified = true;

    const token = jwt.sign(
      {
        _id: check._id,
        email: check.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    check.save()

    return res.send({ status: true, message: "OTP verified successfully", token });

  }
  catch {
    res.send({ status: false, message: "error chek otp" })
  }
}
module.exports = { sendemail, verifyotp }


