import { Head } from "@inertiajs/react";
import { MdOutlineDownload } from "react-icons/md";

function Emplois({ emplois }) {
    console.log(emplois);
    return (
        <>
            <Head title={`Les emplois du temps`} />
            <div className="mb-4">
                <div className="flex items-center justify-center h-24 rounded dark:bg-gray-800">
                    <div className="text-3xl dark:text-gray-500 ml-4">
                        <div className="text-xxl text-green-700 font-bold dark:text-white">
                            Les emplois du temps
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
                                                className="bg-blue-300 text-blue-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                                            >
                                                <MdOutlineDownload className="h-6 w-6" />
                                            </a>
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
        </>
    );
}

export default Emplois;
