import { BsSend } from "react-icons/bs";
import Modal from "./Modal";

function Envoyer({ name, hide, envoyer }) {
    return (
        <Modal show className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="p-6 text-center">
                    <BsSend className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Voullez-vous vraiment Envoyer les données
                        d'authentification <br />a <strong>{name}</strong> ?
                    </h3>
                    <button
                        type="button"
                        className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                        onClick={envoyer}
                    >
                        Oui
                    </button>
                    <button
                        type="button"
                        onClick={hide}
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                        Non
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default Envoyer;
