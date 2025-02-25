const express = require("express");
const cors = require("cors");
const db = require("./models/db");
const app = express();

// ✅ อนุญาตให้ React (`localhost:5173`) ใช้งาน API
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/meetings", require("./routes/meetings"));
app.use("/api/acting-director", require("./routes/actingDirector"));
app.use("/api/users", require("./routes/users"));
app.use("/api/work-groups", require("./routes/workGroups"));





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
