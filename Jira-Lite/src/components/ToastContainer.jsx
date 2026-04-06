import { useProjects } from "../context/ProjectContext";
import Toast from "./Toast";

export default function ToastContainer() {
    const { state, dispatch } = useProjects();

    function handleClose(toastId){
        dispatch({
            type: 'HIDE_TOAST',
            payload: {
                id: toastId
            }
        });
    }

    return(
        <div>
            {state.toasts?.map((toast) => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={() => handleClose(toast.id)}
                />
            ))}
        </div>
    );
}