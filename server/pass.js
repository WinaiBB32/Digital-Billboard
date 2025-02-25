const bcrypt = require("bcryptjs");

const password = "bee1234";  // 🔥 เปลี่ยนเป็นรหัสผ่านที่ต้องการ
bcrypt.hash(password, 10, function(err, hash) {
  if (err) throw err;
  console.log("🔑 Hashed Password:", hash);
});
