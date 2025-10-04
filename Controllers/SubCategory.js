const { Subcategory } = require('../Models/SubCategory');



 async function createSubCategory(req,res){
    try {
        const { type, description } = req.body;
        const isMatch = await Subcategory.findOne({where: {type}});
        if(isMatch){
            return res.status(400).json({
                Error: "Type is already define..."
            });
        }

        const newType  = await Subcategory.create({type, description});
        return res.status(200).json({
            Data: newType
        });

    } catch (error) {
        console.log("Error while creating the sub-category.....",error);
        return res.status(400).json({
            Error:error
        });
    }
};

module.exports = {
  createSubCategory,
};