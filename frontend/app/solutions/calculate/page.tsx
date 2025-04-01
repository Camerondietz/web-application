"use client"
import Link from "next/link";
import { useRouter } from "next/navigation"
//import { useDispatch } from "react-redux";
//import { LoginSuccess } from "../../store/features/auth/authSlice";
//import { useState } from "react";

export default function checkout() {
    const router = useRouter();
    const handleClick = () => {
        console.log("placing order");
        router.push("/");
    };
    return (
        <>
            <h2>
            calculate page
            </h2>
            <button onClick={handleClick}>Return home</button>
        </>
    );
}