import express from "express";
import timeLineController from "../controller/timeLineController.js";

const router = express.Router();

router.route("/add").post(timeLineController.CreateSenderTimeLine);
router.route("/update/:id").put(timeLineController.UpdateSenderTimeLineC);
router.route("/delete/:id").delete(timeLineController.DeleteSendTimeLineC);
router.route("/all").get(timeLineController.FindAllTimeLine);

export default router;
/**
 * @swagger
 * tags:
 *   - name: TimeLine
 *     description: Operations related to TimeLines
 * paths:
 *   /api/v1/timeline/add:
 *     post:
 *       summary: Create a sender TimeLine
 *       tags: [TimeLine]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - title
 *                 - description
 *                 - from
 *                 - to
 *               properties:
 *                 title:
 *                   type: string
 *                   description: The time line content
 *                   example: John Doe
 *                 description:
 *                   type: string
 *                   description: The TimeLine content
 *                   example: Hello, world!
 *                 from:
 *                   type: string
 *                   description: The subject of the TimeLine
 *                   example: Greetings
 *                 to:
 *                   type: string
 *                   description: The subject of the TimeLine
 *                   example: Greetings
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '400':
 *           description: Invalid request payload
 *         '500':
 *           description: Internal server error
 */

/**
 * @swagger
 * /api/v1/timeline/all:
 *   get:
 *     summary: Retrieve all TimeLines
 *     description: |
 *       Retrieve all TimeLines. Requires authentication.
 *     tags: [TimeLine]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '401':
 *         description: Unauthorized access
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/timeline/update/{id}:
 *   put:
 *     summary: Update a sender TimeLine
 *     description: |
 *       Update a sender TimeLine. Requires authentication.
 *     tags: [TimeLine]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the TimeLine to update
 *           example: 123456789
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - from
 *               - to
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the TimeLine
 *                 example: My Timeline
 *               description:
 *                 type: string
 *                 description: The description of the TimeLine
 *                 example: This is my timeline description
 *               from:
 *                 type: string
 *                 format: date-time
 *                 description: The start time of the TimeLine
 *                 example: '2023-01-01T00:00:00Z'
 *               to:
 *                 type: string
 *                 format: date-time
 *                 description: The end time of the TimeLine
 *                 example: '2023-12-31T23:59:59Z'
 *     responses:
 *       '200':
 *         description: TimeLine updated successfully
 *       '400':
 *         description: Invalid request payload
 *       '404':
 *         description: TimeLine not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/timeline/delete/{id}:
 *   delete:
 *     summary: Delete a sender TimeLine
 *     description: |
 *       Delete a sender TimeLine. Requires authentication.
 *     tags: [TimeLine]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the TimeLine to delete
 *           example: 123456789
 *     responses:
 *       '200':
 *         description: TimeLine deleted successfully
 *       '400':
 *         description: Invalid request payload
 *       '404':
 *         description: TimeLine not found
 *       '500':
 *         description: Internal server error
 */
