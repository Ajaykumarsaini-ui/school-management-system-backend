import Notice from "../models/notice.model.js";

export const addNotice = async (req, res) => {
  const { title, message, audience } = req.body;

  // Validate fields
  if (!title || !message || !audience || !req.file) {
    return res.status(400).json({ error: "All fields are required" });
  }

  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  console.log("req.user:", req.user);

  try {
    const notice = await Notice.create({
      school: req.user.schoolId,
      title,
      message,
      audience,
      attachment: req.file.path,  // or wherever your multer saves the file
    });

    res.status(201).json({ notice, message: "Notice added successfully" });
  } catch (error) {
    console.error("Error creating notice:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find();
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateNotice = async (req, res) => {
  const { id } = req.params;
  const { title, message, audience, attachment } = req.body;
  try {
    const notice = await Notice.findByIdAndUpdate(
      id,
      { title, message, audience, attachment },
      { new: true }
    );
    res.status(200).json({ notice, message: "Notice updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteNotice = async (req, res) => {
  const { id } = req.params;
  try {
    const notice = await Notice.findByIdAndDelete(id);
    res.status(200).json({ notice, message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
