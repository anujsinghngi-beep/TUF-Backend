const { sequelize } = require("../Config/Database");
const { Topics } = require("../Models/TopicModel");
const { Op, QueryTypes, col, where } = require("sequelize");
const createTopic = async (req, res) => {
  try {
    const { name, description } = req.body;
    const isMatch = await Topics.findOne({ where: { name } });
    if (isMatch) {
      return res.status(400).json({
        message: "Topic already exists",
      });
    }

    const newTopic = await Topics.create({ name, description });
    return res.status(200).json({
      message: "New Topic created Successfully.",
      newTopic,
    });
  } catch (error) {
    console.log("Error while creating the topic...", error);
  }
};

// with the help of ORM
const getAllTopics = async (req, res) => {
  try {
    const {
      searchBy = "",
      pageNumber = 1,
      itemPerPage = 5,
      sortBy = "name",
      orderBy = "DESC",
    } = req.body;
    let offset = (pageNumber - 1) * itemPerPage;
    let availableCols = ["name", "desc"];
    let availableSorting = ["DESC", "ASC"];

    let validCols = availableCols.includes(sortBy) ? sortBy : "name";
    let validSorting = availableSorting.includes(orderBy.toUpperCase())
      ? orderBy.toUpperCase()
      : "DESC";
    let whereCondition = {};
    if (searchBy) {
      whereCondition = {
        [Op.or]: [
          { name: { [Op.like]: searchBy } },
          { description: { [Op.like]: searchBy } },
        ],
      };
    }
    const { rows: Data, count: totalRecords } = await Topics.findAndCountAll({
      where: whereCondition,
      limit: itemPerPage,
      offset: offset,
      order: [[validCols, validSorting]],
    });

    return res.status(200).json({
      Data: Data,
      totalRecords: totalRecords,
    });
  } catch (error) {
    console.log(`Error while listing the topics`, error);
    return res.status(400).json({
      error: error,
    });
  }
};

//without the ORM

const getAllTopicsWithoutOrm = async (req, res) => {
  try {
    const {
      searchBy = "",
      pageNumber = 1,
      itemPerPage = 5,
      sortBy = "name",
      orderBy = "DESC",
    } = req.body;
    let offset = (pageNumber - 1) * itemPerPage;
    let availableCols = ["name", "description"];
    let availableSorting = ["DESC", "ASC"];

    let validCols = availableCols.includes(sortBy) ? sortBy : "name";
    let validSorting = availableSorting.includes(orderBy.toUpperCase())? orderBy.toUpperCase(): "ASC";

    const topics = await sequelize.query(
      `
      select * from topics
      where name like :searchBy 
      order by ${validCols} ${validSorting} 
      limit :itemPerPage offset :offset;
      `,
      {
        replacements: {
          searchBy: `%${searchBy}%`,
          itemPerPage: itemPerPage,
          offset: offset,
        },
        type: QueryTypes.SELECT,
      }
    );

    //Calculating the pagination
    const [{ totalRecords }] = await sequelize.query(
      `select count(*) as totalRecords from topics`,
      { type: QueryTypes.SELECT }
    );

    return res.status(200).json({
      Data: topics,
      totalRecords: totalRecords,
    });
  } catch (error) {
     console.log(`Error while listing the topics`, error);
    return res.status(400).json({
      error: error,
    });
  }
};
module.exports = { createTopic, getAllTopics, getAllTopicsWithoutOrm };
