const router = require("express-promise-router")();
const UserDetailsController = require("../controller/userDetails");

router
  .route("/:userId")
  /**
   * @swagger
   * /users/(userId):
   *  get:
   *    summary: Get all traveller details
   *    description: Used to get all the traveller details for a certain user id
   *    responses:
   *      '200':
   *        description: Got all traveller details successfully
   *      '500':
   *        description: Server error
   *  parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *         type: String
   *         description: The user ID
   */
  .get(UserDetailsController.getAllUserDetails)
  /**
   * @swagger
   * /users/(userId):
   *   post:
   *     tags:
   *       - User
   *     description: Save traveller details for a user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: newUserDetail
   *         description: User object
   *         in: body
   *         required: true
   *     responses:
   *       200:
   *         description: Return saved user
   */
  .post(UserDetailsController.addNewUserDetail);

router
  .route("/:userDetailId")
  .get(UserDetailsController.getUserDetail)
  .delete(UserDetailsController.deleteUserDetail)
  .put(UserDetailsController.replaceUserDetail);

module.exports = router;
