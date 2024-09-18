const express = require('express');
const cors = require('cors');

const app = express();
const contactsRouter = require("./app/routes/contact.route");

// Cho phép các yêu cầu từ mọi nguồn
app.use(cors());

// Sử dụng middleware để parse dữ liệu JSON từ các request
app.use(express.json());

// Định nghĩa route GET cho đường dẫn gốc ('/')
app.get('/', (req, res) => {
  // Trả về một response với dữ liệu JSON
  res.json({ message: 'Welcome to contact book application.' });
});
app.use("/api/contacts", contactsRouter);

// Export ứng dụng để sử dụng ở các file khác
module.exports = app;