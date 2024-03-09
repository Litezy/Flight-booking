import toast from 'react-hot-toast'

export const errorMessage = (message) => {
 return toast.error(message),{
    duration:3000,
    position: 'top-center'
 }
}
export const successMessage = (message) => {
 return toast.success(message),{
    duration:3000,
    position: 'top-center'
 }
}