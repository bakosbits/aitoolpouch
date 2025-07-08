import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { name, email, message, contact_company, startTime } = req.body;

    if (contact_company && contact_company.trim() !== "") {
        // Successfully caught a bot, but return 200 to confuse spammers
        return res.status(200).json({ success: true, message: "Thank you for your message." });
    }

    const elapsed = Date.now() - Number(startTime);
    if (elapsed < 2000) {
        // Likely a bot, return 200 to confuse spammers
        return res.status(200).json({ success: true, message: "Thank you for your message." });
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
        return res.status(400).json({ success: false, error: "Invalid email" });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        // Email to site owner (you)
        await transporter.sendMail({
            from: `"AI Tool Pouch" <${process.env.GMAIL_USER}>`,
            to: "webmaster@aitoolpouch.com",
            subject: `New Contact Submission from ${name}`,
            text: `
New message received:

Name: ${name}
Email: ${email}

Message:
${message}
                `,
        });

        // Auto-reply to the sender
        await transporter.sendMail({
            from: `"AI Tool Pouch" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: `Thanks for contacting AI Tool Pouch!`,
            text: `Hi ${name},
                Thanks for reaching out - your message has been received and we'll be in touch shortly.

                If this wasn’t you, feel free to ignore this email.

                - The AI Tool Pouch Team`,
        });

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error("Email send error:", err);
        return res.status(500).json({ success: false, error: "Email failed" });
    }
}
