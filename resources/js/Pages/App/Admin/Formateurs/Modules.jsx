import { Link, useForm } from "@inertiajs/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { MdAdd } from "react-icons/md";

function Modules({ modules, formateur }) {
    const [add, setAdd] = useState(false),
        {
            setData,
            errors,
            clearErrors,
            reset,
            cancel,
            processing,
            post,
            wasSuccessful,
        } = useForm({
            module_id: "",
            formateur_id: formateur.id,
        });

    const submitModule = (e) => {
        e.preventDefault();
        console.log("ed");
        post(route("formateurs.module"), { preserveScroll: true });
    };

    useEffect(() => {
        if (wasSuccessful) {
            setAdd(false);
        }
    }, [wasSuccessful]);

    return (
        <>
            <div className="text-xxl ml-2 text-green-700 font-bold dark:text-white">
                Les modules
            </div>
            <div className="p-5 h-fit mb-4 rounded bg-green-50 dark:bg-gray-800">
                <div
                    className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700"
                    align="center"
                >
                    {formateur.modules.map(({ id, name }, index) => (
                        <div className="grid grid-cols-2" key={index}>
                            <Link className="text-lg font-semibold p-1 col-span">
                                {name}
                            </Link>
                            <div className="col-span">
                                <Link
                                    href={`/formateurs/module/${formateur.id}/${id}`}
                                    method="delete"
                                    as="button"
                                >
                                    <AiOutlineMinus className="text-red-600 h-8 w-8" />
                                </Link>
                            </div>
                        </div>
                    ))}
                    {!add ? (
                        <div className="grid grid-cols-2 -mb-2">
                            <div className="text-lg font-semibold p-1 col-span">
                                Ajouter un module
                            </div>

                            <div className="col-span">
                                <button onClick={() => setAdd(true)}>
                                    <MdAdd className="text-green-600 h-8 w-8" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={submitModule}>
                            <div className="grid grid-cols-2 mt-4 -mb-2">
                                <div className="text-lg font-semibold p-1 col-span">
                                    <select
                                        name="module_id"
                                        onChange={(e) =>
                                            setData("module_id", e.target.value)
                                        }
                                        className="-mt-2 border border-gray-300 bg-green-50 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-52 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                    >
                                        <option value="">
                                            Selectioner un module
                                        </option>
                                        {modules.map(({ id, name }, index) => (
                                            <option key={index} value={id}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.module_id && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.module_id}
                                        </p>
                                    )}
                                </div>
                                <div className="col-span">
                                    <button type="submit" disabled={processing}>
                                        <MdAdd className="text-green-600 h-8 w-8" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            clearErrors();
                                            reset();
                                            cancel();
                                            setAdd(false);
                                        }}
                                    >
                                        <AiOutlineMinus className="text-red-600 h-8 w-8" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}

export default Modules;
