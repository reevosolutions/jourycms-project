import uploadMiddleware from './multer.middleware';


export default {
  /**
   * Check if user is logged in
   * - If the request is identified as a service request, always pass
   * - If user is logged in pass
   * - else throw UnauthorizedException
   */
  uploadMiddleware,
  

}