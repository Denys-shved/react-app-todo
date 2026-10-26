import type { AnchorHTMLAttributes, ReactNode } from "react";

type PropRouterLink = {
    to: string;
    children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const RouterLink = ({ to, children, ...rest }: PropRouterLink) => {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>)=>{
        event.preventDefault()
        window.history.pushState({}, "", to)
        window.dispatchEvent(new PopStateEvent('popstate'))
    }
    return(
        <a 
        href={to} 
        onClick={handleClick}
        {...rest}>
            {children}
        </a>
    )
}

export default RouterLink