import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { MdDelete, MdOutlineDownload } from "react-icons/md";
import Edit from "./Edit";
import Delete from "@/Components/Delete";

function Emplois({ emplois, type, hide }) {
    const [edit, setEdit] = useState({ id: "", inEdit: false }),
        [del, setDel] = useState({ id: "", inDelete: false });

    const endEdit = () => setEdit({ id: "", inEdit: false });
    const hideDelete = () => setDel({ id: "", inDelete: false });

    const destroy = () => {
        router.delete(route("emplois.destroy", del.id));
        hideDelete();
    };

    const getEmploi = (id) =>
        emplois.find((emlpoi) => Number(emlpoi.id) === Number(id));

    return (
        <>
            <Head title={`Les emplois des ${type}`} />
            <div className="mb-4">
                <div className="flex items-center justify-center h-24 rounded dark:bg-gray-800">
                    <button
                        onClick={() => hide()}
                        className="bg-green-100 text-green-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                    >
                        <FaArrowLeft className="h-fit w-6" />
                    </button>
                    <div className="text-3xl dark:text-gray-500 ml-4">
                        <div className="text-xxl text-green-700 font-bold dark:text-white">
                            Les emplois des {type}
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
                {emplois.length > 0 ? (
                    emplois.map(({ info, id, date }, index) => (
                        <div
                            className="flex items-center justify-center rounded bg-green-50 h-fit dark:bg-gray-800"
                            key={index}
                        >
                            <div className="flex flex-col items-center justify-center pb-2">
                                <div className="flex items-center space-x-4 pt-2">
                                    <div className="font-medium text-xl  dark:text-white">
                                        <div>
                                            <span className="bg-green-100 text-green-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                                {info.name}
                                            </span>
                                            <span className="bg-green-100 text-green-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                                {date}
                                            </span>
                                        </div>
                                        <div className="flex justify-center mt-2">
                                            <span className="bg-green-100 text-green-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                                {(
                                                    info.size /
                                                    (1024 * 1024)
                                                ).toPrecision(1)}{" "}
                                                Mb
                                            </span>
                                        </div>
                                        <div className="flex justify-center mt-2">
                                            <a
                                                href={`emplois/download/${id}`}
                                                className="bg-green-100 text-green-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                                            >
                                                <MdOutlineDownload className="h-6 w-6" />
                                            </a>
                                            <button
                                                onClick={() =>
                                                    setEdit({
                                                        id,
                                                        inEdit: true,
                                                    })
                                                }
                                                className="bg-yellow-100 text-yellow-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"
                                            >
                                                <AiTwotoneEdit className="h-6 w-6" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setDel({
                                                        id,
                                                        inDelete: true,
                                                    })
                                                }
                                                className="bg-red-100 text-red-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                                            >
                                                <MdDelete className="h-6 w-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center col-span-3 justify-center h-96 rounded bg-gray-50 dark:bg-gray-800">
                        <div className="text-3xl  text-gray-400 dark:text-gray-500 ml-4">
                            <div className="text-xxl text-black font-bold dark:text-white">
                                Pas d'emplois {type} pour le momment!
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {edit.inEdit && (
                <Edit emploi={getEmploi(edit.id)} endEdit={endEdit} />
            )}
            {del.inDelete && (
                <Delete
                    name={getEmploi(del.id).info.name}
                    del={destroy}
                    hide={hideDelete}
                />
            )}
        </>
    );
}

export default Emplois;
