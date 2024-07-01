import { CustomError } from "./custom.error.js";
export default function handleError(res,error,context){
    if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(`Unexpected error in ${context}`, error.message);
        res
          .status(error.status)
          .json({ message:error.message});
      }
}