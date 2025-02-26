
import React from "react";

function Header() {
    
    return (
        <nav className="header fixed bg-[#ed1b24] border-gray-200 px-1 rounded-b-2xl pb-3 w-[101%] h-[20rem]" >
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto px-3 pb-3">
                    <img src="/logo.png" className="h-16 mx-auto mt-4" />
             
               
            </div>

        </nav>
    );
}

export default Header;
