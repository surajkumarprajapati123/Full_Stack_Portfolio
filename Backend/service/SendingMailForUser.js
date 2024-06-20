import SendMailAnywhere from "./emailSend.js";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SendMailPasswordForgate = async (email, token) => {
  try {
    const templatePath = path.join(__dirname, "../views/ForgateSendMail.ejs");
    const resetLink = `http://localhost:3000/forgate-password/${token}`;
    console.log("tmplatePath ", templatePath);
    const data = await ejs.renderFile(templatePath, { resetLink });
    const Email = await SendMailAnywhere(email, data, "forgate-password");
    return Email;
  } catch (error) {
    console.log("error is ", error);
  }
};

export default SendMailPasswordForgate;
