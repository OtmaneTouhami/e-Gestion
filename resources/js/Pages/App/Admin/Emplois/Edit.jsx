import Modal from "@/Components/Modal";
import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { ImCancelCircle, ImCheckmark } from "react-icons/im";
import { TiCancel } from "react-icons/ti";

function Edit({ emploi, endEdit }) {
    const {
            data,
            setData,
            errors,
            processing,
            wasSuccessful,
            submit,
            cancel,
            reset,
            clearErrors,
        } = useForm({
            name: emploi.info.name,
            type: emploi.type,
            date: emploi.date,
            emploi: emploi.info.path,
            id: emploi.id,
        }),
        [dragError, setDragError] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('test');
        submit('post',route("change",data.id));
    };

    const handleDragEmploi = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        const allowedTypes = [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-excel",
            "application/vnd.ms-excel.sheet.macroEnabled.12",
            "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
            "text/csv",
        ];

        if (allowedTypes.includes(file.type)) {
            setData("emploi", file);
            setDragError(false);
        } else {
            setDragError(true);
        }
    };

    useEffect(() => {
        if (wasSuccessful) {
            endEdit();
        }
    }, [wasSuccessful]);

    useEffect(() => {
        console.table(data);
    }, [data]);

    return (
        <Modal show maxWidth="2xl">
            <Head title="Editer un emploi" />

            <div className="relative bg-green-50 rounded-lg shadow dark:bg-gray-700">
                <div className="px-6 py-6 lg:px-8">
                    <div className="flex justify-between">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                            Editer un emploi
                        </h3>
                        <button className="mb-4" onClick={() => endEdit()}>
                            <ImCancelCircle className="text-gray-700 h-6 w-6" />
                        </button>
                    </div>
                </div>
                <form
                    onSubmit={submitHandler}
                    encType="multipart/htmlForm-data"
                >
                    {!data.emploi ? (
                        <div className="flex items-center justify-center w-full h-72 -mt-14">
                            <label
                                htmlFor="dropzone-file"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDragEmploi}
                                className="flex flex-col items-center justify-center w-[80%] h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-green-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-green-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        aria-hidden="true"
                                        className="w-10 h-10 mb-3 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        ></path>
                                    </svg>
                                    <p className="mb-2 text-lg text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">
                                            Cliquez pour uploder l'emploi
                                        </span>
                                        <br />
                                        <span className="ml-16 p-1">
                                            ou drager ici
                                        </span>
                                    </p>
                                    <p className="text-l text-gray-500 dark:text-gray-400">
                                        xlsx, xls, xlsm, xlsb ou csv
                                    </p>
                                    {dragError && (
                                        <p className="text-l text-red-600">
                                            Type invalide
                                        </p>
                                    )}
                                </div>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    name="emploi"
                                    className="hidden"
                                    accept=".xlsx, application/vnd.ms-excel, .xlsm, .xlsb, text/csv"
                                    onChange={(e) =>
                                        setData("emploi", e.target.files[0])
                                    }
                                />
                            </label>
                        </div>
                    ) : (
                        <>
                            <div className="relative rounded-lg shadow dark:bg-gray-700 -mt-8">
                                <div className="px-6 py-6 lg:px-8">
                                    <div className="mb-2">
                                        <label
                                            htmlFor="name"
                                            className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                                        >
                                            L'emploi
                                        </label>
                                        <div className="grid grid-cols-10">
                                            <p className="bg-gray-50 mt-2 col-span-9 border bg-green-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                                {data.emploi.name
                                                    ? data.emploi.name
                                                    : data.emploi.split("/")[1]}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    setData("emploi", "")
                                                }
                                                className="bg-red-800 text-white text-sm font-medium px-3 py-0.5 w-[70%] h-[80%] rounded-lg mt-2 ml-4 dark:bg-red-900 dark:text-red-300"
                                            >
                                                <FaPen className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {errors.emploi && (
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                {errors.emploi}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-2">
                                        <label
                                            htmlFor="name"
                                            className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                                        >
                                            Nom du fichier
                                            <span className="text-red-700 text-xl">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="bg-gray-50 mt-2 border bg-green-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            placeholder="Ex: Semaine_1"
                                        />
                                        {errors.name && (
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid gap-4 -mt-5 sm:grid-cols-2 sm:gap-6">
                                        <div className="col-span-2"></div>
                                        <div className="w-full">
                                            <label
                                                htmlFor="date"
                                                className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                                            >
                                                Pour
                                                <span className="text-red-700 text-xl">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="date"
                                                name="date"
                                                id="date"
                                                value={data.date}
                                                onChange={(e) =>
                                                    setData(
                                                        "date",
                                                        e.target.value
                                                    )
                                                }
                                                className="bg-gray-50 mt-2 border border-gray-300 bg-green-50 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            />
                                            {errors.date && (
                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {errors.date}
                                                </p>
                                            )}
                                        </div>
                                        <div className="w-full">
                                            <label className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                                Type
                                                <span className="text-red-700 text-xl">
                                                    *
                                                </span>
                                            </label>

                                            <div className="flex mt-5">
                                                <div className="flex items-center mr-4">
                                                    <input
                                                        type="radio"
                                                        name="type"
                                                        id="formateurs"
                                                        value={"formateurs"}
                                                        checked={
                                                            data.type ===
                                                            "formateurs"
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "type",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-4 h-4 text-green-500 bg-green-50 border-gray-400 focus:ring-green-500 dark:focus:ring-green-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    />
                                                    <label
                                                        htmlFor="formateurs"
                                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                    >
                                                        Formateur
                                                    </label>
                                                </div>
                                                <div className="flex items-center mr-4">
                                                    <input
                                                        type="radio"
                                                        name="type"
                                                        id="stagiaires"
                                                        value={"stagiaires"}
                                                        checked={
                                                            data.type ===
                                                            "stagiaires"
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "type",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-4 h-4 text-green-500 bg-green-50 border-gray-400 focus:ring-green-500 dark:focus:ring-green-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    />
                                                    <label
                                                        htmlFor="stagiaires"
                                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                    >
                                                        Stagiaire
                                                    </label>
                                                </div>
                                            </div>
                                            {errors.type && (
                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {errors.type}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-full ml-1 mt-8 flex justify-center">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                        >
                                            <ImCheckmark className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                cancel();
                                                reset();
                                                clearErrors();
                                                endEdit();
                                            }}
                                            type="button"
                                            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                        >
                                            <TiCancel className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </Modal>
    );
}

export default Edit;
