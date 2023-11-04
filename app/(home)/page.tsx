import Image from "next/image";
import MaxWrapper from "@/app/components/maxWrapper";
import SectionHeader from "@/app/components/sectionHeader";
import { AiFillInstagram } from "react-icons/ai";

export default function Home() {
    return (
        <>
            <MaxWrapper>
                <div className="p-8 flex flex-col items-center justify-center ">
                    <h1 className="text-center text-5xl sm:text-6xl font-bold tracking-tighter mb-6 dark:text-neutral-200">
                        Developer Extraordinaire
                    </h1>
                    <p className=" max-w-2xl p-2 m-auto text-lg mb-4 dark:text-neutral-200">
                        Hello, my name is Madison. I&apos;m a developer in
                        Guthrie, OK. I work on all sorts of different projects,
                        and have many hobbies and fascinations.
                    </p>
                    <a
                        href="/contact"
                        className="bg-blue-800 px-4 py-3 rounded-lg hover:bg-blue-900 transition text-white"
                    >
                        Contact Me
                    </a>
                </div>
            </MaxWrapper>

            <section className="w-full bg-[#00000009] dark:bg-neutral-900 py-4">
                <MaxWrapper>
                    <SectionHeader title="about me" />
                    <Image
                        src="/pfpbw.png"
                        width={350}
                        height={350}
                        alt="A picture of me"
                        className="m-auto"
                    />
                    <p className="text-lg m-auto p-4 dark:text-neutral-200">
                        My focus is learning as much as possible about software
                        engineering; I consider it a life-long journey. I&apos;m
                        primarily &quot;self-taught&quot; - meaning I read a lot
                        of books by smarter people. I do other things to occupy
                        my time, like working on my 100 year old house, spending
                        time with my wife and 2 dogs, being bad at golf, and
                        occasionally going around town to photograph some
                        architecture.
                    </p>
                </MaxWrapper>
            </section>
            <section className="w-full py-4">
                <MaxWrapper>
                    <SectionHeader title="instagram" right />
                    <a
                        href="https://instagram.com/madfunphotography"
                        className="p-4 w-fit h-fit block ml-auto"
                    >
                        <AiFillInstagram
                            size={48}
                            className="transition dark:text-neutral-200 hover:text-neutral-500"
                        />
                    </a>
                </MaxWrapper>
            </section>
        </>
    );
}
