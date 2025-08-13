import college from "../models/college_model.js";
import intern from "../models/intern_model.js";

export const create_intern = async (req, res) => {
  try {
    let { name, email, mobile, college_name } = req.body;

    if (!Object.keys(req.body).length)
      return res
        .status(400)
        .send({ status: false, msg: "Request body can not be empty" });

    if (!name)
      return res
        .status(400)
        .send({ status: false, msg: "Intern name is required" });

    if (name && !isNaN(name))
      return res
        .status(400)
        .send({ status: false, msg: "Invalid intern name" });

    if (!email)
      return res.status(400).send({ status: false, msg: "email is required" });

    if (email && !isNaN(email))
      return res.status(400).send({ status: false, msg: "Invalid email" });

    const is_mail_exist = await intern.findOne({
      email: email,
      is_deleted: false,
    });

    if (is_mail_exist)
      return res
        .status(400)
        .send({ status: false, msg: "Email is already in use" });

    if (!mobile)
      return res
        .status(400)
        .send({ status: false, msg: "mobile number is required" });

    if (mobile && isNaN(mobile))
      return res
        .status(400)
        .send({ status: false, msg: "Invalid mobile number" });

    const is_mobile_exist = await intern.findOne({
      mobile: mobile,
      is_deleted: false,
    });

    if (is_mobile_exist)
      return res
        .status(400)
        .send({ status: false, msg: "Mobile number is already in use" });

    if (!college_name)
      return res
        .status(400)
        .send({ status: false, msg: "College name is required" });

    if (college_name && !isNaN(college_name))
      return res
        .status(400)
        .send({ status: false, msg: "Invalid College name" });

    const get_college = await college.findOne({
      name: college_name.toUpperCase(),
      is_deleted: false,
    });

    if (!get_college)
      return res.status(400).send({
        status: false,
        msg: "No college found with this college name",
      });

    req.body.college_id = get_college._id;

    delete req.body.college_name;

    const save_data = await intern.create(req.body);

    return res.status(201).send({
      status: true,
      msg: "Intern created successfully",
      data: save_data,
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

export const get_interns = async (req, res) => {
  try {
    let { search } = req.query;

    let filter = { is_deleted: false };

    if (search) {
      filter["name"] = { $regex: search, $options: "i" };
    }

    let intern_details = await intern.find(filter);

    if (!intern_details.length)
      return res.status(404).send({ status: false, msg: "No intern found" });

    return res
      .status(200)
      .send({ status: true, msg: "Interns List", data: intern_details });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};
