import express from "express";
import SoftwareController from "../controller/SoftwareController.js";

const router = express.Router();

router.route("/add").post(SoftwareController.CreateSenderSoftware);
router.route("/update/:id").put(SoftwareController.UpdateSenderSoftwareC);
router.route("/delete/:id").delete(SoftwareController.DeleteSendSoftwareC);
router.route("/all").get(SoftwareController.FindAllSoftware);

export default router;
/**
 * @swagger
 * tags:
 *   - name: Software
 *     description: Operations related to Softwares
 * paths:
 *   /api/v1/Software/add:
 *     post:
 *       summary: Create a sender Software
 *       tags: [Software]
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The name of the Software
 *                   example: John Doe
 *                 svg:
 *                   type: string
 *                   format: binary
 *                   description: The SVG file to upload
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
 * /api/v1/Software/all:
 *   get:
 *     summary: Retrieve all Softwares
 *     description: |
 *       Retrieve all Softwares. Requires authentication.
 *     tags: [Software]
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
 * /api/v1/Software/update/{id}:
 *   put:
 *     summary: Update a sender Software with name and SVG file
 *     description: Update a sender Software. Requires authentication.
 *     tags: 
 *       - Software
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the Software to update
 *           example: 123456789
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the Software
 *                 example: My Updated Software
 *               svg:
 *                 type: string
 *                 format: binary
 *                 description: SVG file to update
 *     responses:
 *       '200':
 *         description: Software updated successfully
 *       '400':
 *         description: Invalid request payload
 *       '404':
 *         description: Software not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/Software/delete/{id}:
 *   delete:
 *     summary: Delete a sender Software
 *     description: |
 *       Delete a sender Software. Requires authentication.
 *     tags: [Software]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the Software to delete
 *           example: 123456789
 *     responses:
 *       '200':
 *         description: Software deleted successfully
 *       '400':
 *         description: Invalid request payload
 *       '404':
 *         description: Software not found
 *       '500':
 *         description: Internal server error
 */
