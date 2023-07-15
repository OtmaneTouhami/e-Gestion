import { Link, useForm } from "@inertiajs/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { MdAdd, MdCancel, MdModeEditOutline } from "react-icons/md";

function Show({ groupe }) {
    const [edit, setEdit] = useState({ id: "", inEdit: false, editIndex: "" }),
        {
            data,
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
            formateur_id: "",
            group_id: groupe.id,
        }),
        { filiere, formateurs, number, id } = groupe,
        { code, modules } = filiere;

    const submitHandler = (e) => {
        e.preventDefault();
        post(route("groupes.formateur"));
    };

    useEffect(() => {
        if (wasSuccessful) {
            setEdit({ id: "", inEdit: false, editIndex: "" });
        }
    }, [wasSuccessful]);

    const moduleFormateur = (moduleId) =>
        formateurs.find(
            ({ pivot }) => Number(pivot.module_id) === Number(moduleId)
        );

    return (
        <>
            <div className="mb-4">
                <div className="flex items-center justify-center h-24 rounded dark:bg-gray-800">
                    <div className="text-3xl dark:text-gray-500 ml-4">
                        <div className="text-xxl text-green-700 font-bold dark:text-white">
                            {code}
                            {number}
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-xxl ml-2 text-green-700 font-bold dark:text-white">
                Les modules
            </div>
            <div className="p-5 h-fit mb-4 rounded bg-green-50 dark:bg-gray-800">
                <form onSubmit={submitHandler}>
                    <div
                        className=" text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700"
                        align="center"
                    >
                        {modules.map((module, index) => (
                            <div className="grid grid-cols-3" key={index}>
                                <div className="text-lg font-semibold p-1 col-span">
                                    {module.name}
                                </div>
                                <div className="text-lg font-semibold p-1 col-span">
                                    {edit.inEdit &&
                                    Number(edit.editIndex) === index ? (
                                        <div className="p-2">
                                            <select
                                                name="formateur_id"
                                                value={
                                                    data.formateur_id
                                                    // moduleFormateur(
                                                    //     module.id
                                                    // ) !== undefined &&
                                                    // moduleFormateur(module.id)
                                                    //     .id
                                                }
                                                onChange={(e) => {
                                                    setData({
                                                        ...data,
                                                        formateur_id:
                                                            e.target.value,
                                                        module_id: module.id,
                                                    });
                                                }}
                                                className="-mt-2 border border-gray-300 bg-green-50 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                            >
                                                <option value="">
                                                    Selectionner un formateur
                                                </option>
                                                {module.formateurs.map(
                                                    ({ id, info }, index) => (
                                                        <option
                                                            value={id}
                                                            key={index}
                                                        >
                                                            {info.lastname}{" "}
                                                            {info.firstname}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                            {errors.formateur_id && (
                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {errors.formateur_id}
                                                </p>
                                            )}
                                        </div>
                                    ) : moduleFormateur(module.id) ? (
                                        <>
                                            <Link
                                                href={route(
                                                    "formateurs.show",
                                                    moduleFormateur(module.id)
                                                        .id
                                                )}
                                                as="button"
                                            >
                                                {
                                                    moduleFormateur(module.id)
                                                        .info.lastname
                                                }{" "}
                                                {
                                                    moduleFormateur(module.id)
                                                        .info.firstname
                                                }
                                            </Link>
                                        </>
                                    ) : (
                                        "Aucun formateur affecté"
                                    )}
                                </div>
                                <div className="col-span">
                                    {edit.inEdit &&
                                    Number(edit.editIndex) === index ? (
                                        <>
                                            <button
                                                type="submit"
                                                disabled={processing}
                                            >
                                                <FaCheck className="text-green-500 h-8 w-8" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setEdit({
                                                        id: "",
                                                        inEdit: false,
                                                        editIndex: "",
                                                    });
                                                    reset();
                                                    cancel();
                                                    clearErrors();
                                                }}
                                                className="ml-4"
                                            >
                                                <MdCancel className="text-red-600 h-8 w-8" />
                                            </button>
                                        </>
                                    ) : (
                                        <p
                                            className="cursor-pointer"
                                            onClick={() => {
                                                setEdit({
                                                    id: module.id,
                                                    inEdit: true,
                                                    editIndex: index,
                                                });
                                                setData({
                                                    ...data,
                                                    formateur_id:
                                                        moduleFormateur(
                                                            module.id
                                                        ) !== undefined
                                                            ? moduleFormateur(
                                                                  module.id
                                                              ).id
                                                            : "",
                                                    module_id: module.id,
                                                });
                                            }}
                                        >
                                            <MdModeEditOutline className="text-yellow-400 h-8 w-8" />
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </form>
            </div>
        </>
    );
}

export default Show;
