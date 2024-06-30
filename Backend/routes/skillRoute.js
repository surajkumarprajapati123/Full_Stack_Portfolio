import express from "express";
import skillControlle from "../controller/skillControlle.js";


const router = express.Router();

router.route("/add").post(skillControlle.CreateSenderskill);
router.route("/update/:id").put(skillControlle.UpdateSenderskillC);
router.route("/delete/:id").delete(skillControlle.DeleteSendskillC);
router.route("/all").get(skillControlle.FindAllskill);

export default router;
/**
 * @swagger
 * tags:
 *   - name: skill
 *     description: Operations related to skills
 */

/**
 * @swagger
 * /api/v1/skill/add:
 *   post:
 *     summary: Create a sender skill
 *     tags: [skill]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The name of the skill
 *                 example: John Doe
 *               proficiency:
 *                 type: number
 *                 description: The proficiency level of the skill
 *                 example: 6 
 *               svg:
 *                 type: string
 *                 format: binary
 *                 description: The SVG file to upload
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '400':
 *         description: Invalid request payload
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/skill/all:
 *   get:
 *     summary: Retrieve all skills
 *     description: Retrieve all skills. Requires authentication.
 *     tags: [skill]
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
 * /api/v1/skill/update/{id}:
 *   put:
 *     summary: Update a sender skill with name and SVG file
 *     description: Update a sender skill. Requires authentication.
 *     tags: 
 *       - skill
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the skill to update
 *           example: 123456789
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The name of the skill
 *                 example: My Updated skill
 *               proficiency:
 *                   type: number
 *                   description: The name of the skill
 *                   example: 6
 *               svg:
 *                 type: string
 *                 format: binary
 *                 description: SVG file to update
 *     responses:
 *       '200':
 *         description: skill updated successfully
 *       '400':
 *         description: Invalid request payload
 *       '404':
 *         description: skill not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/skill/delete/{id}:
 *   delete:
 *     summary: Delete a sender skill
 *     description: |
 *       Delete a sender skill. Requires authentication.
 *     tags: [skill]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the skill to delete
 *           example: 123456789
 *     responses:
 *       '200':
 *         description: skill deleted successfully
 *       '400':
 *         description: Invalid request payload
 *       '404':
 *         description: skill not found
 *       '500':
 *         description: Internal server error
 */
