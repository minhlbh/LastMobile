var postFormBody = (details)  => {
    var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      return formBody = formBody.join("&");
  }
  
  export default postFormBody;