import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import "flowbite";
import NavBar from "./Layouts/NavBar";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title}` || appName,
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        let page = pages[`./Pages/${name}.jsx`];
        page.default.layout =
            name.startsWith("Auth/Login") ||
            name.startsWith("Auth/RegeneratePassword")
                ? undefined
                : (page) => <NavBar children={page} />;
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
                <App {...props} />
        );
    },
    progress: {
        color: "#009f89",
    },
});
