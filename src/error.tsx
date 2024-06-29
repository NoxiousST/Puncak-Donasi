import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom"

export default function Error() {
    const error = useRouteError() as RouterError;

    return (

        <section id="error-page" className="flex items-center h-screen overflow-hidden p-16 bg-gray-900 text-gray-100">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl text-gray-600">
                        <span className="sr-only">Error</span>{error.name}
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">{errorMessage(error)}</p>
                    <p className="mt-4 mb-8 text-gray-400">But dont worry, you can find plenty of other things on
                        our homepage.</p>
                    <Link to={`/`} className="px-8 py-3 font-semibold rounded bg-violet-400 text-gray-900">Back to
                        homepage</Link>
                </div>
            </div>
        </section>
    );
}


interface RouterError extends Error {}

function isRouterError(object: any): object is RouterError {
    return 'message' in object;
}

function errorMessage(error: unknown): string {
    if (isRouteErrorResponse(error)) {
        return `${error.status} ${error.statusText}`
    } else if (error != undefined && isRouterError(error)) {
        return error.message;
    } else if (typeof error === 'string') {
        return error
    } else {
        console.error(error)
        return 'Unknown error'
    }
}
