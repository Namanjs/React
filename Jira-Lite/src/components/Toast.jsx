import { createPortal } from "react-dom";
import { useEffect } from "react";

export default function Toast({message, type, onClose}) {
    useEffect(() => {
        const timerId = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timerId);
    }, [onClose]);

    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

    return createPortal(
        <div className={`fixed bottom-5 right-5 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-in slide-in-from-right ${bgColor}`}>
            <div className="flex items-center justify-between">
                <span className="font-semibold">{message}</span>
                <button onClick={onClose} className="ml-4 text-xl font-bold">&times;</button>
            </div>
        </div>,
        document.getElementById('toast-portal')
    );
}