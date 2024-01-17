"use client";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { setToken } from "../lib/auth";
import { useUser } from "../lib/authContext";
import { RegisterFormState, createUser } from "../lib/actions";

export default function RegisterForm() {
    const router = useRouter();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        username: "",
    });
    const { setUser } = useUser();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const responseData: RegisterFormState = await createUser(userData);
        console.log(responseData);

        if (responseData.data && setToken(responseData.data)) {
            setUser({ user: responseData.data.user.username, loading: false });
            router.replace("/profile");
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <div className="flex w-full">
            <div className="w-full bg-white border-2 rounded p-8 m-4 md:max-w-sm md:mx-auto">
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
                    Register
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="mb-4 md:flex md:flex-wrap md:justify-between"
                >
                    <div className="flex flex-col mb-4 md:w-full">
                        <label
                            className="font-bold text-lg mb-2"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            className="form-input rounded"
                            type="text"
                            name="username"
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4 md:w-full">
                        <label
                            className="font-bold text-lg mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="form-input rounded"
                            type="email"
                            name="email"
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-6 md:w-full">
                        <label
                            className="font-bold text-lg mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="form-input rounded"
                            type="password"
                            name="password"
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </div>
                    <button
                        className="block bg-blue-600 hover:bg-blue-800 text-white text-lg rounded px-4 py-2 mx-auto"
                        type="submit"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
