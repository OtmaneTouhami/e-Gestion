import { Head } from "@inertiajs/react";
import { useState } from "react";
import { TbSquareRoundedPlus } from "react-icons/tb";
import Ajouter from "./Ajouter";
import Emplois from "./Emplois";

function ListEmplois({ emplois }) {
    const [add, setAdd] = useState(false),
        [showEmplois, setShowEmplois] = useState({ show: false, type: "" });

    const hideAddModal = () => setAdd(false);
    const hideShowEmplois = () => setShowEmplois({ show: false, type: "" });

    const getEmplois = (type) =>
        emplois.filter((emploi) => emploi.type === type);

    return (
        <>
            {!showEmplois.show ? (
                <>
                    <Head title="Emplois du temps" />
                    <div className="mb-4">
                        <div className="flex items-center justify-center h-24 rounded dark:bg-gray-800">
                            <div className="text-3xl dark:text-gray-500 ml-4">
                                <div className="text-xxl text-green-700 font-bold dark:text-white">
                                    Les emplois du temps
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center justify-center rounded h-[45vh] dark:bg-gray-800">
                            <p
                                onClick={() =>
                                    setShowEmplois({
                                        show: true,
                                        type: "formateurs",
                                    })
                                }
                                className="text-3xl text-green-700 font-bold border border-2 border-green-700 hover:p-[12%] bg-green-50 p-[10%] rounded-lg cursor-pointer dark:text-gray-500"
                            >
                                Formateurs
                            </p>
                        </div>
                        <div className="flex items-center justify-center rounded h-[45vh] dark:bg-gray-800">
                            <p
                                onClick={() =>
                                    setShowEmplois({
                                        show: true,
                                        type: "stagiaires",
                                    })
                                }
                                className="text-3xl text-green-700 font-bold border border-2 border-green-700 hover:p-[12%] bg-green-50 p-[10%] rounded-lg cursor-pointer dark:text-gray-500"
                            >
                                Stagiaires
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center justify-center rounded h-28 dark:bg-gray-800"></div>
                        <div className="flex items-center justify-end rounded h-28 dark:bg-gray-800">
                            <button
                                type="button"
                                onClick={() => setAdd(true)}
                                className="text-green-700 hover:text-white border border-2 border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-600 font-medium rounded-full text-sm px-3 py-2.5 mr-12 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                            >
                                <TbSquareRoundedPlus className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                    {add && <Ajouter end={hideAddModal} />}
                </>
            ) : (
                <Emplois
                    emplois={getEmplois(showEmplois.type)}
                    type={showEmplois.type}
                    hide={hideShowEmplois}
                />
            )}
        </>
    );
}

export default ListEmplois;
