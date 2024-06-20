import express from "express";
import {
  CreateSenderMessage,
  DeleteSendMessageC,
  FindAllMessage,
  UpdateSenderMessageC,
} from "../controller/messageController.js";

const router = express.Router();

router.route("/create").post(CreateSenderMessage);
router.route("/update").put(UpdateSenderMessageC);
router.route("/delete").delete(DeleteSendMessageC);
router.route("/all").get(FindAllMessage);

export default router;
/**
 * @swagger
 * tags:
 *   - name: Message
 *     description: Operations related to messages
 * paths:
 *   /message/create:
 *     post:
 *       summary: Create a sender message
 *       tags: [Message]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - senderName
 *                 - message
 *                 - subject
 *               properties:
 *                 senderName:
 *                   type: string
 *                   description: The name of the sender
 *                   example: John Doe
 *                 message:
 *                   type: string
 *                   description: The message content
 *                   example: Hello, world!
 *                 subject:
 *                   type: string
 *                   description: The subject of the message
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
 * /messages/all:
 *   get:
 *     summary: Retrieve all messages
 *     description: |
 *       Retrieve all messages. Requires authentication.
 *     tags: [Message]
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
 * /messages/update:
 *   put:
 *     summary: Update a sender message
 *     description: |
 *       Update a sender message. Requires authentication.
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               messageId:
 *                 type: string
 *                 description: The ID of the message to update
 *                 example: 123456789
 *               senderName:
 *                 type: string
 *                 description: The updated name of the sender
 *                 example: Jane Doe
 *               message:
 *                 type: string
 *                 description: The updated message content
 *                 example: Goodbye, world!
 *               subject:
 *                 type: string
 *                 description: The updated subject of the message
 *                 example: Farewell
 *     responses:
 *       '200':
 *         description: Message updated successfully
 *       '400':
 *         description: Invalid request payload
 *       '404':
 *         description: Message not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /messages/delete:
 *   delete:
 *     summary: Delete a sender message
 *     description: |
 *       Delete a sender message. Requires authentication.
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               messageId:
 *                 type: string
 *                 description: The ID of the message to delete
 *                 example: 123456789
 *     responses:
 *       '200':
 *         description: Message deleted successfully
 *       '404':
 *         description: Message not found
 *       '500':
 *         description: Internal server error
 */
