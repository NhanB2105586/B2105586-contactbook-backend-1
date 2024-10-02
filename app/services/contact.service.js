const { ObjectId } = require("mongodb");  // Import ObjectId từ mongodb để sử dụng khi cần truy vấn theo ID

class ContactService {
  constructor(client) {  // Hàm khởi tạo nhận vào đối tượng client kết nối với MongoDB
    this.Contact = client.db().collection("contacts");  // Liên kết tới collection "contacts" trong cơ sở dữ liệu
  }
  extractConactData(payload) {
    const contact = {
      name: payload.name,
      email: payload.email,
      address: payload.address,
      phone: payload.phone,
      favorite: payload.favorite,
    };
    
    // Xóa các trường undefined
    Object.keys(contact).forEach(
      (key) => contact[key] === undefined && delete contact[key]
    );
    return contact;
  }

  async create(payload) {
    const contact = this.extractConactData(payload);
    const result = await this.Contact.findOneAndUpdate(
      contact,
      { $set: { favorite: contact.favorite === true } },  // Cập nhật trạng thái yêu thích
      { returnDocument: "after", upsert: true }  // Tùy chọn trả về tài liệu sau khi cập nhật, và upsert để chèn nếu chưa tồn tại
    );
    return result;
  }

   async find(filter) {
        const cursor = await this.Contact.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.Contact.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

  async update (id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }
  
    async delete(id) {
        const result = await this.Contact.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async findFavorite() {
        return await this.find({ favorite: true});
    }

    async deleteAll() {
        const result = await this.Contact.deleteMany({});
        return result.deleteCount;
    }

}


module.exports = ContactService;  // Xuất class ContactService để sử dụng ở các file khác
