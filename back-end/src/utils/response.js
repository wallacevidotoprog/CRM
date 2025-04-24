class ResponseApi {
  static response(message = null, data = null,pagination = null) {
    return {
      ...(message && { message }),
      ...(data && { data }),
      ...(pagination && { pagination }),
    };
  }
}

export default ResponseApi;
