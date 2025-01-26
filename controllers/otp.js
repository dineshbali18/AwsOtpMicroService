const mongoose = require("mongoose");
const otp = require("../models/otp");
const nodemailer = require('nodemailer');

exports.generateOtp = async (req, res) => {
  try {
    const otp2 = Math.floor(100000 + Math.random() * 900000); // Generate random OTP

    // Check if OTP already exists for the email
    const existingOtp = await otp.find({ email: req.body.email }).exec();

    if (existingOtp.length === 0) {
      // Create new OTP entry if not exists
      const otpData = new otp({
        otp: otp2,
        email: req.body.email,
      });

      await otpData.save();
      return res.json({ message: "OTP generated and saved successfully." });
    } else {
      // Update OTP if email exists
      await otp.findOneAndUpdate({ email: req.body.email }, { $set: { otp: otp2 } });
      return res.status(200).json({ message: "OTP updated successfully." });
    }
  } catch (err) {
    console.error('Error generating OTP:', err);
    return res.status(500).json({ error: 'An error occurred while generating OTP.' });
  }
};

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Find OTP for the provided email
    const userOtp = await otp.find({ email }).exec();

    if (userOtp.length > 0) {
      const send_otp = userOtp[0].otp;

      // Set up the transporter for sending email using Gmail SMTP
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        auth: {
          user: 'bigboss5teluguvoting@gmail.com', // Keep your credentials here
          pass: 'pcrsarbmhuyhttoq',               // Keep your credentials here
        },
      });

      // Send OTP via email
      const result = await transporter.sendMail({
        from: 'BigBosstelugu <bigbossvoting@gmail.com>',
        to: email,
        subject: 'OTP - Bearcat Code',
        text: `Your OTP for Bearcat Finance App is ${send_otp}`,
      });

      console.log('Email sent:', result);
      return res.status(200).json({ message: 'OTP sent successfully.' });
    } else {
      return res.status(400).json({ error: 'OTP expired or not found.' });
    }
  } catch (err) {
    console.error('Error sending OTP:', err);
    return res.status(500).json({ error: 'An error occurred while sending OTP.' });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp: enteredOtp } = req.body;

    // Find OTP for the provided email
    const userOtp = await otp.find({ email }).exec();

    if (userOtp.length === 0) {
      return res.status(400).json({ error: 'OTP expired or not found.' });
    }

    // Compare entered OTP with the stored OTP
    if (enteredOtp === userOtp[0].otp.toString()) {
      return res.json({ message: 'OTP verified successfully.' });
    } else {
      return res.status(400).json({ error: 'Incorrect OTP.' });
    }
  } catch (err) {
    console.error('Error verifying OTP:', err);
    return res.status(500).json({ error: 'An error occurred while verifying OTP.' });
  }
};
