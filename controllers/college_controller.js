import college from "../models/college_model.js";
import intern from "../models/intern_model.js";

export const create_college = async (req, res) => {
  try {
    let { name, full_name, logo_link } = req.body;

    if (!Object.keys(req.body).length)
      return res
        .status(400)
        .send({ status: false, msg: "Request body can not be empty" });

    if (!name)
      return res
        .status(400)
        .send({ status: false, msg: "College name is required" });

    if (name && !isNaN(name))
      return res
        .status(400)
        .send({ status: false, msg: "Invalid college name" });

    const is_name_exist = await college.findOne({
      name: name,
      is_deleted: false,
    });

    if (is_name_exist)
      return res
        .status(400)
        .send({ status: false, msg: "College name already exist" });

    if (!full_name)
      return res
        .status(400)
        .send({ status: false, msg: "College full name is required" });

    if (full_name && !isNaN(full_name))
      return res
        .status(400)
        .send({ status: false, msg: "Invalid college full name" });

    if (!logo_link)
      return res
        .status(400)
        .send({ status: false, msg: "Logo link is required" });

    if (logo_link && !isNaN(logo_link))
      return res.status(400).send({ status: false, msg: "Invalid logo link" });

    const save_data = await college.create(req.body);

    return res.status(201).send({
      status: true,
      msg: "College created successfully",
      data: save_data,
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

export const get_college_details = async (req, res) => {
  try {
    let { name } = req.query;

    let filter = { is_deleted: false };

    if (name) {
      filter["name"] = name.toUpperCase();
    }

    let check_college = await college.find(filter);

    if (!check_college.length)
      return res.status(404).send({ status: false, msg: "No college found" });

    return res
      .status(200)
      .send({ status: true, msg: "Colleges List", data: check_college });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

export const get_college = async (req, res) => {
  try {
    let { college_name } = req.query;

    if (!college_name)
      return res
        .status(400)
        .send({ status: false, msg: "College name is required" });

    if (college_name && !isNaN(college_name))
      return res
        .status(400)
        .send({ status: false, msg: "Invalid college name" });

    let check_college = await college
      .findOne({
        name: college_name,
        is_deleted: false,
      })
      .select({ __v: 0, createdAt: 0, updatedAt: 0, is_deleted: 0 });

    if (!check_college)
      return res.status(404).send({ status: false, msg: "No college found" });

    const get_all_interns = await intern
      .find({
        college_id: check_college._id,
        is_deleted: false,
      })
      .select({ __v: 0, createdAt: 0, updatedAt: 0, is_deleted: 0 });

    return res.status(200).send({
      status: true,
      msg: "List of all interns who have applied for internship at this college",
      data: { college_details: check_college, interns: get_all_interns },
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};
