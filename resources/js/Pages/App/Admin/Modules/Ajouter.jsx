import Modal from "@/Components/Modal";
import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { ImCheckmark } from "react-icons/im";
import { TiCancel } from "react-icons/ti";

function Ajouter({ end }) {
    const {
        data,
        setData,
        errors,
        clearErrors,
        post,
        cancel,
        processing,
        reset,
        wasSuccessful,
    } = useForm({
        name: "",
        nb_hours: "",
        type: "",
        coef: "",
        year: "",
    });

    const submitHandler = (e) => {
        e.preventDefault();
        post(route("modules.store"));
    };

    useEffect(() => {
        if (wasSuccessful) {
            end();
        }
    }, [wasSuccessful]);

    return (
        <Modal show maxWidth="2xl">
            <Head title="Ajouter un module" />
            <div className="relative bg-green-50 rounded-lg shadow dark:bg-gray-700">
                <div className="px-6 py-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                        Ajouter un module
                    </h3>
                    <form className="space-y-6" onSubmit={submitHandler}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="col-span-2">
                                <label
                                    htmlFor="name"
                                    className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                                >
                                    Libellé
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
                                    className=" mt-2 border bg-green-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Entrer libellé du module"
                                />
                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="nb_hours"
                                    className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                                >
                                    Nombre d'heures
                                    <span className="text-red-700 text-xl">
                                        *
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    name="nb_hours"
                                    id="nb_hours"
                                    value={data.nb_hours}
                                    onChange={(e) =>
                                        setData("nb_hours", e.target.value)
                                    }
                                    placeholder="Heures de module"
                                    className=" mt-2 border border-gray-300 bg-green-50 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                                {errors.nb_hours && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.nb_hours}
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
                                            id="technique"
                                            value={"technique"}
                                            checked={data.type === "technique"}
                                            onChange={(e) =>
                                                setData("type", e.target.value)
                                            }
                                            className="w-4 h-4 text-green-500 bg-green-50 border-gray-400 focus:ring-green-500 dark:focus:ring-green-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="technique"
                                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Technique
                                        </label>
                                    </div>
                                    <div className="flex items-center mr-4">
                                        <input
                                            type="radio"
                                            name="type"
                                            id="complémentaire"
                                            value={"complémentaire"}
                                            checked={
                                                data.type === "complémentaire"
                                            }
                                            onChange={(e) =>
                                                setData("type", e.target.value)
                                            }
                                            className="w-4 h-4 text-green-500 bg-green-50 border-gray-400 focus:ring-green-500 dark:focus:ring-green-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="complémentaire"
                                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Complémentaire
                                        </label>
                                    </div>
                                </div>
                                {errors.type && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.type}
                                    </p>
                                )}
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="coef"
                                    className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                                >
                                    Coefficient
                                    <span className="text-red-700 text-xl">
                                        *
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    name="coef"
                                    id="coef"
                                    value={data.coef}
                                    onChange={(e) =>
                                        setData("coef", e.target.value)
                                    }
                                    placeholder="Entrer le coefficient"
                                    className=" mt-2 border border-gray-300 bg-green-50 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                                {errors.coef && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.coef}
                                    </p>
                                )}
                            </div>
                            <div className="w-full">
                                <label className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                    Module de
                                    <span className="text-red-700 text-xl">
                                        *
                                    </span>
                                </label>

                                <div className="flex mt-5">
                                    <div className="flex items-center mr-4">
                                        <input
                                            type="radio"
                                            name="year"
                                            id="first"
                                            value={"first"}
                                            checked={data.year === "first"}
                                            onChange={(e) =>
                                                setData("year", e.target.value)
                                            }
                                            className="w-4 h-4 text-green-500 bg-green-50 border-gray-400 focus:ring-green-500 dark:focus:ring-green-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="first"
                                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            1<sup>ère</sup> année
                                        </label>
                                    </div>
                                    <div className="flex items-center mr-4">
                                        <input
                                            type="radio"
                                            name="year"
                                            id="second"
                                            value={"second"}
                                            checked={
                                                data.year === "second"
                                            }
                                            onChange={(e) =>
                                                setData("year", e.target.value)
                                            }
                                            className="w-4 h-4 text-green-500 bg-green-50 border-gray-400 focus:ring-green-500 dark:focus:ring-green-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="second"
                                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            2<sup>éme</sup> année
                                        </label>
                                    </div>
                                    <div className="flex items-center mr-4">
                                        <input
                                            type="radio"
                                            name="year"
                                            id="both"
                                            value={"both"}
                                            checked={
                                                data.year === "both"
                                            }
                                            onChange={(e) =>
                                                setData("year", e.target.value)
                                            }
                                            className="w-4 h-4 text-green-500 bg-green-50 border-gray-400 focus:ring-green-500 dark:focus:ring-green-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="both"
                                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Les deux
                                        </label>
                                    </div>
                                </div>
                                {errors.year && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.year}
                                    </p>
                                )}
                            </div>

                            <div className="w-full ml-1 mt-1 col-span-2 flex justify-center">
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
                                        end();
                                    }}
                                    type="button"
                                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                >
                                    <TiCancel className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}

export default Ajouter;
