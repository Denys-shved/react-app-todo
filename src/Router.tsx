import { useEffect, useState } from "react"

type RouterProps = {
    routes: Routes;
}
type Routes = Record<string, React.ComponentType<any>> & {
    "*": React.ComponentType<any>;
};

export const useRoute = () => {
    const [path, setPath] = useState(window.location.pathname)

    useEffect(()=>{
        const onLocationChange = () =>{
            setPath(window.location.pathname)
        }

        window.addEventListener('popstate', onLocationChange)

        return () =>{
            window.removeEventListener('popstate', onLocationChange)
        }
    }, [])

    return path
}

const Router = ({routes}: RouterProps) =>{
    const path = useRoute()

    if(path.startsWith('/tasks/')){
        const id = path.replace('/tasks/', '')
        const TaskPage = routes['/tasks/:id']

        return <TaskPage 
            params={{id}} />
    }
    const Page = routes[path] ?? routes['*']

    return <Page />
}

export default Router