const { MongoClient } = require("mongodb"); // Import MongoClient từ thư viện mongodb

class MongoDB {
  static connect = async (uri) => {  // Phương thức static để kết nối tới MongoDB với URI
    if (this.client) return this.client; // Nếu đã có kết nối (client), trả về nó ngay lập tức
    this.client = await MongoClient.connect(uri); // Nếu chưa có, thì tạo kết nối mới
    return this.client; // Trả về đối tượng client (kết nối MongoDB)
  };
}

module.exports = MongoDB; // Xuất class MongoDB để có thể sử dụng ở nơi khác
