class ResponseApi {
  static response(message = null, data = null) {
    return {
      ...(message && { message }),
      ...(data && { data }),
    };
  }
}

export default ResponseApi;
