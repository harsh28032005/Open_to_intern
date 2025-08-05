import college from "../models/college_model.js";

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
