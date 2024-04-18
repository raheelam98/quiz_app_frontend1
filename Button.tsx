
import React from "react";

const Button = ({children, buttonType}:{
    children: React.ReactNode,    // given type
    buttonType: "reset" | "submit" | "button"
}) => {
    return(
        <div>
            <button type={buttonType} className="p-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md">
                {children}
            </button>
        </div>
    )
}

export default Button