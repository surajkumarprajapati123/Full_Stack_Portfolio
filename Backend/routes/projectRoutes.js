import express from "express";

import projectController from "../controller/projectController.js";


const router = express.Router();

router.route("/add").post(projectController.CreateSenderProject);
router.route("/update/:id").put(projectController.UpdateSenderProjectC);
router.route("/delete/:id").delete(projectController.DeleteSendProjectC);
router.route("/all").get(projectController.FindAllProject);

export default router;
/**
 * @swagger
 * tags:
 *   - name: Project
 *     description: Operations related to Projects
 */

/**
 * @swagger
 * tags:
 *   - name: Project
 *     description: Operations related to Projects
 */

/**
 * @swagger
 * /api/v1/Project/add:
 *   post:
 *     summary: Create a sender Project
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The name of the Project
 *                 example: John Doe
 *               proficiency:
 *                 type: number
 *                 description: The proficiency level of the Project
 *                 example: 6 
 *               svg:
 *                 type: string
 *                 format: binary
 *                 description: The SVG file to upload
 *               description:
 *                 type: string
 *                 description: Description of the Project
 *                 example: A web application for managing tasks
 *               gitRepoLink:
 *                 type: string
 *                 description: Link to the GitHub repository
 *                 example: https://github.com/user/project
 *               projectLink:
 *                 type: string
 *                 description: Link to the live project
 *                 example: https://project.example.com
 *               technologies:
 *                 type: string
 *                 description: Technologies used in the Project
 *                 example: Node.js, React, MongoDB
 *               stack:
 *                 type: string
 *                 description: Stack used in the Project
 *                 example: MERN
 *               deployed:
 *                 type: string
 *                 description: Deployment status of the Project
 *                 example: Production
 *               projectBanner:
 *                 type: string
 *                 format: binary
 *                 description: Banner image for the Project
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
 * /api/v1/Project/all:
 *   get:
 *     summary: Retrieve all Projects
 *     description: Retrieve all Projects. Requires authentication.
 *     tags: [Project]
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
 * /api/v1/Project/update/{id}:
 *   put:
 *     summary: Update a sender Project with details and image
 *     description: Update a sender Project. Requires authentication.
 *     tags: 
 *       - Project
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the Project to update
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
 *                 description: The updated name of the Project
 *                 example: My Updated Project
 *               proficiency:
 *                 type: number
 *                 description: The proficiency level of the Project
 *                 example: 6
 *               svg:
 *                 type: string
 *                 format: binary
 *                 description: Updated SVG file for the Project
 *               description:
 *                 type: string
 *                 description: Description of the Project
 *                 example: A web application for managing tasks
 *               gitRepoLink:
 *                 type: string
 *                 description: Link to the GitHub repository
 *                 example: https://github.com/user/project
 *               projectLink:
 *                 type: string
 *                 description: Link to the live project
 *                 example: https://project.example.com
 *               technologies:
 *                 type: string
 *                 description: Technologies used in the Project
 *                 example: Node.js, React, MongoDB
 *               stack:
 *                 type: string
 *                 description: Stack used in the Project
 *                 example: MERN
 *               deployed:
 *                 type: string
 *                 description: Deployment status of the Project
 *                 example: Production
 *               projectBanner:
 *                 type: string
 *                 format: binary
 *                 description: Banner image for the Project
 *     responses:
 *       '200':
 *         description: Project updated successfully
 *       '400':
 *         description: Invalid request payload
 *       '404':
 *         description: Project not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/Project/delete/{id}:
 *   delete:
 *     summary: Delete a sender Project
 *     description: |
 *       Delete a sender Project. Requires authentication.
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the Project to delete
 *           example: 123456789
 *     responses:
 *       '200':
 *         description: Project deleted successfully
 *       '400':
 *         description: Invalid request payload
 *       '404':
 *         description: Project not found
 *       '500':
 *         description: Internal server error
 */
