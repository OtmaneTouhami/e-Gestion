import { Head } from "@inertiajs/react";
import { useState } from "react";
import { TbSquareRoundedPlus } from "react-icons/tb";
import Ajouter from "./Ajouter";
import Exercices from "./Exercices";

function ListExercices({ exercices, modules }) {
    const [add, setAdd] = useState(false),
        [showExercices, setShowExercices] = useState({
            show: false,
            module_id: "",
            type: "",
        });

    const hideAddModal = () => setAdd(false);
    const hideShowExercices = () =>
        setShowExercices({ show: false, module_id: "", type: "" });

    const getExercices = (module_id) =>
        exercices.filter(
            (exercice) => Number(exercice.module_id) === Number(module_id)
        );

    console.log(exercices);
    return (
        <>
            {!showExercices.show ? (
                <>
                    <Head title="List des exercices" />
                    <div className="mb-4">
                        <div className="flex items-center justify-center h-24 rounded dark:bg-gray-800">
                            <div className="text-3xl dark:text-gray-500 ml-4">
                                <div className="text-xxl text-green-700 font-bold dark:text-white">
                                    Votre exercices
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-8 mb-4">
                        {modules.map(({ id, name }, index) => (
                            <div
                                className="flex col-span items-center justify-center rounded h-24 dark:bg-gray-800"
                                key={index}
                            >
                                <p
                                    onClick={() =>
                                        setShowExercices({
                                            show: true,
                                            module_id: id,
                                            type: name,
                                        })
                                    }
                                    className="flex items-center text-center justify-center text-xl text-green-700 font-bold border border-2 border-green-700 w-48 h-24 hover:h-28 hover:w-52 bg-green-50 rounded-lg cursor-pointer dark:text-gray-500"
                                >
                                    {name}
                                </p>
                            </div>
                        ))}
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
                    {add && (
                        <Ajouter end={hideAddModal} modules={modules} />
                    )}
                </>
            ) : (
                <Exercices
                    exercices={getExercices(showExercices.module_id)}
                    type={showExercices.type}
                    hide={hideShowExercices}
                    modules={modules}
                />
            )}
        </>
    );
}

export default ListExercices;
