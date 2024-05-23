import db from '../models/index';

getRoleId = async (userId) => {
    let roleId = '1';
    if (userId) {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            });
            if (user && user.roleId) {
                roleId = user.roleId;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    return roleId;
}