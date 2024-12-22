const { addNewPartner, getPartnerById } = require("../../models/partnerModel");

const createPartnerService = async (partner) => {
  try {
    const addedPartner = await addNewPartner(partner);
    const partnerId = addedPartner.insertId;

    const newPartner = await getPartnerById(partnerId);

    return newPartner[0]; // Return the first element from the array
  } catch (err) {
    throw err;
  }
};

module.exports = { createPartnerService };
