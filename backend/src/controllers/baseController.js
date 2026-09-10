export class BaseController {
  handleSuccess(res, data, message = 'Success', status = 200) {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  }

  handleError(res, error, context = 'Operation') {
    console.error(`[Error in ${context}]:`, error);
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      message,
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
}
