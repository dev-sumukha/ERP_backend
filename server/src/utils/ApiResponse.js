class ApiResponse { 
    constructor(statusCode,data,message = "Success"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400; // It should be less than 400 because of standard status code    
    }
}