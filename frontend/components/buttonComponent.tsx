import React from "react";
type ButtonProps={
    children:React.ReactNode,
    onClick:()=>void
}

export const Button=({children,onClick}:ButtonProps)=>{
    return <button className="p-4 rounded-lg bg-green-400 flex m-4 grid-col-10 gap-4" onClick={onClick}>
        {children}
    </button>
    
}