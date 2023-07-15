import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import UpdatePasswordForm from "../Profile/Partials/UpdatePasswordForm";

export default function RegeneratePassword({ status }) {
    return (
        <GuestLayout>
            <Head title="Regenerate password" />
            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}
            <UpdatePasswordForm className="max-w-xl" />
        </GuestLayout>
    );
}
