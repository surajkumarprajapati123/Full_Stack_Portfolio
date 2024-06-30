import express from "express";
import userController from "../controller/userController.js";
import upload from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(userController.RegisterUser);
router.route("/update").put(isAuthenticated, userController.UpdatedUser);
router.route("/login").post(userController.Login);
router.route("/logout").post(isAuthenticated, userController.logout);
router.route("/profile").get(isAuthenticated, userController.GetProfile);
router.route("/forgot-link").post(userController.ForgatePassword);
router.route("/verify/:token").post(userController.VerifyToken);
router
  .route("/change-password")
  .put(isAuthenticated, userController.changePassword);

export default router;

// Create User
/**
 * @swagger
 * /api/v1/user/register:
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
 *                 type: string
 *                 format: binary
 *                 description: Avatar image of the user
 *               resume:
 *                 type: string
 *                 format: binary
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
 *                   type: string
 *                   format: uri
 *                   example: "https://example.com/avatar.jpg"
 *                 resume:
 *                   type: string
 *                   format: uri
 *                   example: "https://example.com/resume.pdf"
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

// Update user

/**
 * @swagger
 * /api/v1/user/update:
 *   put:
 *     summary: Update user profile
 *     tags: [User]
 *     requestBody:
 *       description: User profile update data
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
 *                 type: string
 *                 format: binary
 *                 description: Avatar image of the user
 *               resume:
 *                 type: string
 *                 format: binary
 *                 description: Resume file of the user
 *     responses:
 *       200:
 *         description: User updated successfully
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
 *                   type: string
 *                   format: uri
 *                   example: "https://example.com/avatar.jpg"
 *                 resume:
 *                   type: string
 *                   format: uri
 *                   example: "https://example.com/resume.pdf"
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
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
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

// login User

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: Login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "401":
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Invalid email or password
 */

// logout

/**
 * @swagger
 * /api/v1/user/logout:
 *   post:
 *     summary: Logout
 *     tags: [User]
 *     description: Logs out the authenticated user by clearing their access and refresh tokens.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       "401":
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Not authorized
 *       "500":
 *         description: Server error during logout
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 500
 *               message: Server error during logout
 */

// // Verify email
// /**
//  * @swagger
//  * /user/verify-email:
//  *   post:
//  *     summary: Send verification email
//  *     description: An email will be sent with a token to verify the email. Include OTP in the request body for additional security.
//  *     tags: [User]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               otp:
//  *                 type: string
//  *                 description: The one-time password (OTP) sent to the user's email for verification
//  *     responses:
//  *       "204":
//  *         description: No content
//  *       "401":
//  *         $ref: '#/components/responses/Unauthorized'
//  */

// To Get Profile
/**
 * @swagger
 * /api/v1/user/profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the profile information of the authenticated user.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

// Send Reset Link using email
/**
 * @swagger
 * /api/v1/user/forgot-link:
 *   post:
 *     summary: Send password reset link via email
 *     description: Send a password reset link to the user's email address.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address to send the password reset link to.
 *             example:
 *               email: user@example.com
 *     responses:
 *       "204":
 *         description: No Content
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
// Set new password
/**
 * @swagger
 * /api/v1/user/verify/{token}:
 *   post:
 *     summary: Set new password
 *     description: Set a new password for the user.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token for password reset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: New password for the user. At least one number and one letter required.
 *             example:
 *               password: newpassword1
 *     responses:
 *       "204":
 *         description: No Content
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/user/change-password:
 *   put:
 *     summary: Change user password
 *     tags: [User]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       description: Old, new, and confirmation password data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 format: password
 *                 example: "oldpassword123"
 *                 description: The user's current password
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: "newpassword123"
 *                 description: The user's new password
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: "newpassword123"
 *                 description: Confirmation of the user's new password
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password changed successfully"
 *       400:
 *         description: Invalid input or passwords do not match
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input data or passwords do not match"
 *       401:
 *         description: Unauthorized or old password not matched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Old password is not matched"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
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
