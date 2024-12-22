const pool = require("../../models/database");
const finduser = async (username) => {

    try {
        const [adminuser] = await pool.query(`select * from admin where username='${username}'`);

        if (adminuser.length == 0) {
            throw new Error("Requesting adminuser does not exist");
        }
        return adminuser[0]
    } catch (error) {
        throw new Error(error)
    }


}
module.exports = {
    finduser

};