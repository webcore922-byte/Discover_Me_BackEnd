const Contact = require('../model/Contact');
const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({
      createdAt: -1
    });
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};
const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({
      message: 'الرسالة غير موجودة'
    });
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};
const createContact = async (req, res, next) => {
  try {
    const {
      name,
      email,
      message
    } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({
        message: 'من فضلك ادخل كل البيانات المطلوبة'
      });
    }
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};
const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({
      message: 'الرسالة غير موجودة'
    });
    res.status(200).json({
      message: 'تم الحذف بنجاح'
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact
};
