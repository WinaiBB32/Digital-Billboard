const bcrypt = require("bcryptjs");
bcrypt.hash("bee1234", 10, function(err, hash) {
  console.log(hash);
});
