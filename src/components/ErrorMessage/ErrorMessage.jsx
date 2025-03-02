import css from './ErrorMessage.module.css';
import toast, { Toaster } from "react-hot-toast";

function ErrorMessage() {
 
  return (
    <div>
      <Toaster position="top-right" />
  </div>
  )
}

export default ErrorMessage
