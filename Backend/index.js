import app from "./app.js";
import { dbConnection } from "./database/db.js";
dbConnection();
app.listen(process.env.PORT, () => {
  console.log(`Server is started port is ${process.env.PORT}`);
});
