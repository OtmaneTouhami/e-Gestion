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
        libelle: "",
        code: "",
        year: "",
    });

    const submitHandler = (e) => {
        e.preventDefault();
        post(route("filieres.store"));
    };

    useEffect(() => {
        if (wasSuccessful) {
            end();
        }
    }, [wasSuccessful]);

    return (
        <Modal show maxWidth="lg">
            <Head title="Ajouter une filière" />
            <div className="relative bg-green-50 rounded-lg shadow dark:bg-gray-700">
                <div className="px-6 py-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                        Ajouter une filière
                    </h3>
                    <form className="space-y-6" onSubmit={submitHandler}>
                        <div>
                            <label
                                htmlFor="libelle"
                                className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                            >
                                Libellé
                                <span className="text-red-700 text-xl">*</span>
                            </label>
                            <input
                                type="text"
                                name="libelle"
                                id="libelle"
                                value={data.libelle}
                                onChange={(e) =>
                                    setData("libelle", e.target.value)
                                }
                                className="mt-2 border bg-green-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Entrer libellé du filière"
                            />
                            {errors.libelle && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    {errors.libelle}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="code"
                                className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                            >
                                Code
                                <span className="text-red-700 text-xl">*</span>
                            </label>
                            <input
                                type="text"
                                name="code"
                                id="code"
                                value={data.code}
                                onChange={(e) =>
                                    setData("code", e.target.value)
                                }
                                placeholder="Ex: le code de développement digital est Dev"
                                className="mt-2 border border-gray-300 bg-green-50 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            />
                            {errors.code && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    {errors.code}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                Filière de
                                <span className="text-red-700 text-xl">*</span>
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
                                        1<sup>ére</sup> année
                                    </label>
                                </div>
                                <div className="flex items-center mr-4">
                                    <input
                                        type="radio"
                                        name="year"
                                        id="second"
                                        value={"second"}
                                        checked={data.year === "second"}
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
                            </div>
                            {errors.year && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    {errors.year}
                                </p>
                            )}
                        </div>
                        <div className="w-full ml-1 mt-1 flex justify-center">
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
                    </form>
                </div>
            </div>
        </Modal>
    );
}

export default Ajouter;
