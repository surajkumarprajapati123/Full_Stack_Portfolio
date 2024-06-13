import express from "express";
import userController from "../controller/userController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router
  .route("/register")
  .post(
    upload.fields([{ name: "avatar" }, { name: "resume" }]),
    userController.RegisterUser
  );

export default router;

// Create User

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       description: User registration data
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "Jane Smith"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "janesmith@example.com"
 *               phone:
 *                 type: string
 *                 example: "+19876543210"
 *               aboutMe:
 *                 type: string
 *                 example: "Creative graphic designer with 5 years of experience in digital and print media."
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "supersecretpassword"
 *               portfolioURL:
 *                 type: string
 *                 format: uri
 *                 example: "https://portfolio.janesmith.com"
 *               githubURL:
 *                 type: string
 *                 format: uri
 *                 example: "https://github.com/janesmith"
 *               instagramURL:
 *                 type: string
 *                 format: uri
 *                 example: "https://instagram.com/janesmith"
 *               twitterURL:
 *                 type: string
 *                 format: uri
 *                 example: "https://twitter.com/janesmith"
 *               facebookURL:
 *                 type: string
 *                 format: uri
 *                 example: "https://facebook.com/janesmith"
 *               linkedInURL:
 *                 type: string
 *                 format: uri
 *                 example: "https://linkedin.com/in/janesmith"
 *               avatar:
 *                 type: file
 *                 description: Avatar image of the user
 *               resume:
 *                 type: file
 *                 description: Resume file of the user
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "60d0fe4f5311236168a109ca"
 *                 fullName:
 *                   type: string
 *                   example: "Jane Smith"
 *                 email:
 *                   type: string
 *                   example: "janesmith@example.com"
 *                 phone:
 *                   type: string
 *                   example: "+19876543210"
 *                 aboutMe:
 *                   type: string
 *                   example: "Creative graphic designer with 5 years of experience in digital and print media."
 *                 portfolioURL:
 *                   type: string
 *                   example: "https://portfolio.janesmith.com"
 *                 githubURL:
 *                   type: string
 *                   example: "https://github.com/janesmith"
 *                 instagramURL:
 *                   type: string
 *                   example: "https://instagram.com/janesmith"
 *                 twitterURL:
 *                   type: string
 *                   example: "https://twitter.com/janesmith"
 *                 facebookURL:
 *                   type: string
 *                   example: "https://facebook.com/janesmith"
 *                 linkedInURL:
 *                   type: string
 *                   example: "https://linkedin.com/in/janesmith"
 *                 avatar:
 *                   $ref: '#/components/schemas/Image'
 *                 resume:
 *                   $ref: '#/components/schemas/Resume'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input data"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

// Definitions
/**
 * @swagger
 * components:
 *   schemas:
 *     Image:
 *       type: object
 *       properties:
 *         public_id:
 *           type: string
 *           example: "avatar_janesmith"
 *         url:
 *           type: string
 *           format: uri
 *           example: "https://res.cloudinary.com/demo/image/upload/v1234567890/avatar_janesmith.jpg"
 *     Resume:
 *       type: object
 *       properties:
 *         public_id:
 *           type: string
 *           example: "resume_janesmith"
 *         url:
 *           type: string
 *           format: uri
 *           example: "https://res.cloudinary.com/demo/image/upload/v1234567890/resume_janesmith.pdf"
 */
