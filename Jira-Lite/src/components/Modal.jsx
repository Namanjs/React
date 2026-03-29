export default function Modal({ isOpen, onClose, children }) {

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative p-1">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-gray-400 transition-colors "
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-6">
                    {children}
                </div>

            </div>

        </div>
    )
}
