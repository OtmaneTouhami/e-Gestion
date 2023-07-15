import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Info from "./Info";
import Image from "./Image";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoIosSend } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import Edit from "./Edit";
import EditImage from "./EditImage";
import Delete from "@/Components/Delete";
import Envoyer from "@/Components/Envoyer";

function Stagiaire({ stagiaire, groupes }) {
    const [actions, setActions] = useState({
        editInfo: false,
        editImage: false,
        delete: false,
        send: false,
    });
    useEffect(() => console.log(stagiaire), [stagiaire]);

    const closeEditInfo = () => setActions({ ...actions, editInfo: false });
    const closeEditImage = () => setActions({ ...actions, editImage: false });
    const hideDelete = () => setActions({ ...actions, delete: false });
    const hideSend = () => setActions({ ...actions, send: false });

    const destroy = () =>
        router.delete(route("stagiaires.destroy", stagiaire.id));

    const envoyer = () => {
        router.post(route("stagiaires.send", stagiaire.id));
        hideSend();
    };

    return (
        <>
            <Head
                title={`${stagiaire.info.lastname} ${stagiaire.info.firstname}`}
            />
            <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="flex items-center justify-center h-24 rounded dark:bg-gray-800">
                    <div className="text-3xl text-gray-400 dark:text-gray-500 ml-4">
                        <div className="text-xxl text-black font-bold dark:text-white">
                            {stagiaire.info.lastname} {stagiaire.info.firstname}
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4 flex items-center">
                <div className="col-span-2 flex items-center justify-center h-fit mb-4 rounded dark:bg-gray-800">
                    <div className="text-2xl text-gray-400 dark:text-gray-500">
                        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                            {actions.editInfo ? (
                                <Edit
                                    stagiaire={stagiaire}
                                    groupes={groupes}
                                    closeEdit={closeEditInfo}
                                />
                            ) : (
                                <Info stagiaire={stagiaire} />
                            )}

                            <div className="w-full mt-8 flex justify-center">
                                {!actions.editInfo && (
                                    <>
                                        <button
                                            type="button"
                                            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                            title="Editer"
                                            onClick={() =>
                                                setActions({
                                                    ...actions,
                                                    editInfo: true,
                                                })
                                            }
                                        >
                                            <AiFillEdit className="w-5 h-5" />
                                        </button>
                                        <button
                                            type="button"
                                            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                            title="Supprimer"
                                            onClick={() =>
                                                setActions({
                                                    ...actions,
                                                    delete: true,
                                                })
                                            }
                                        >
                                            <RiDeleteBin6Fill className="w-5 h-5" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setActions({
                                                    ...actions,
                                                    send: true,
                                                })
                                            }
                                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                            title="Envoyer les données d'authentification"
                                        >
                                            <IoIosSend className="w-5 h-5" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 p-10 grid gap-0 flex items-center justify-center rounded h-96 dark:bg-gray-800">
                    {actions.editImage ? (
                        <EditImage
                            closeEdit={closeEditImage}
                            id={stagiaire.id}
                        />
                    ) : (
                        <Image avatar={stagiaire.info.avatar} />
                    )}
                    <div className="w-full mt-8 flex justify-center">
                        {!actions.editImage && (
                            <button
                                type="button"
                                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                title="Editer l'image"
                                onClick={() =>
                                    setActions({
                                        ...actions,
                                        editImage: true,
                                    })
                                }
                            >
                                <AiFillEdit className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {actions.delete && (
                <Delete
                    name={`${stagiaire.info.lastname} ${stagiaire.info.firstname}`}
                    hide={hideDelete}
                    del={destroy}
                />
            )}
            {actions.send && (
                <Envoyer
                    name={`${stagiaire.info.lastname} ${stagiaire.info.firstname}`}
                    hide={hideSend}
                    envoyer={envoyer}
                />
            )}
        </>
    );
}

export default Stagiaire;
