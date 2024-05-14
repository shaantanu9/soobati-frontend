export interface ApiResponse<T> {
    statusCode: number;
    message?: string;
    data: T;
}

export interface ApiConfig {
    showLoader?:boolean,
    skipErrorPopup?:boolean,
    optionalHeaders?:any
}


