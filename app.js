const express = require('express');
const cors = require('cors');
const ApiError = require("./app/api-error");
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

// Xử lý lỗi 404 (Not Found)
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào
    // khớp với yêu cầu. Gọi next(error) để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
});

// Định nghĩa middleware xử lý lỗi toàn cục
app.use((err, req, res, next) => {
    // Trong các đoạn code xử lý ở các route, gọi next(error) sẽ chuyển về middleware xử lý lỗi này
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error" });
});

// Export ứng dụng để sử dụng ở các file khác
module.exports = app;