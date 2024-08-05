declare type RequestInst = import('express').Request<{}, any, any, ParsedQs, Record<string, any>>
declare type ResponseInst = import('express').Response<any, Record<string, any>, number>