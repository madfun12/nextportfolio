"use client";
import { useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { BsCheck } from "react-icons/bs";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

type Inputs = {
    name: string;
    email: string;
    phone: string;
    business: string;
    subject: string;
};

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post("/api/email", data);

            toast.success(response.data);
            setSent(true);

            setLoading(false);
        } catch (error) {
            toast.error(`${error}`);
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col m-auto gap-4 max-w-lg mt-4 items-center justify-center"
        >
            <div className="flex flex-col w-full">
                <label className="mb-2 text-neutral-200" htmlFor="name">
                    Name (Required)
                </label>
                <input
                    id="name"
                    {...register("name", { required: true })}
                    className="border border-neutral-600 bg-transparent px-4 py-3 rounded-lg placeholder:text-neutral-300"
                />
                {errors.name && (
                    <span className="text-red-400 ml-2">
                        This field is required
                    </span>
                )}
            </div>
            <div className="flex flex-col w-full">
                <label className="mb-2 text-neutral-200" htmlFor="email">
                    Email (Required)
                </label>
                <input
                    id="email"
                    type="email"
                    {...register("email", { required: true })}
                    className="border border-neutral-600 bg-transparent px-4 py-3 rounded-lg placeholder:text-neutral-300"
                />
                {errors.email && (
                    <span className="text-red-400 ml-2">
                        This field is required
                    </span>
                )}
            </div>
            <div className="flex flex-col w-full">
                <label className="mb-2 text-neutral-200" htmlFor="phone">
                    Phone number
                </label>
                <input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    className="border border-neutral-600 bg-transparent px-4 py-3 rounded-lg placeholder:text-neutral-300"
                />
            </div>
            <div className="flex flex-col w-full">
                <label className="mb-2 text-neutral-200" htmlFor="business">
                    Business
                </label>
                <input
                    id="business"
                    {...register("business")}
                    className="border border-neutral-600 bg-transparent px-4 py-3 rounded-lg placeholder:text-neutral-300"
                />
            </div>
            <div className="flex flex-col w-full">
                <label className="mb-2 text-neutral-200" htmlFor="subject">
                    Subject
                </label>
                <input
                    id="subject"
                    {...register("subject")}
                    className="border border-neutral-600 bg-transparent px-4 py-3 rounded-lg placeholder:text-neutral-300"
                />
            </div>
            <button
                type="submit"
                className={`${
                    sent
                        ? "bg-green-600"
                        : "bg-blue-800 hover:bg-blue-900 disabled:bg-blue-900"
                } px-4 py-3 rounded-lg transition w-fit disabled:cursor-not-allowed min-w-[150px] text-center`}
                disabled={loading || sent}
            >
                {loading ? (
                    <VscLoading
                        className="animate-spin text-center m-auto"
                        size={24}
                    />
                ) : sent ? (
                    <BsCheck size={24} className="m-auto" />
                ) : (
                    "Submit"
                )}
            </button>
        </form>
    );
};

export default ContactForm;
