import React from "react";
import Head from "next/head";
import AppBar from "./AppBar";

import profilePhoto from "public/images/profile.jpg";
import Image from "next/image";

type PageLayoutProps = {
  children: React.ReactNode;
  title?: string | React.ReactNode;
  subtitle?: string;
};

export default function PageLayout(props: PageLayoutProps) {
  const { children, title, subtitle } = props;

  return (
    <div className="flex justify-center bg-neutral-50 p-10 text-black sm:h-fit sm:min-h-screen">
      <Head>
        <title>{"MemoriesHub"}</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          content="collections of memories for your partner"
          name="description"
        />
      </Head>
      <div className="flex w-full max-w-7xl flex-col gap-4 pb-16">
        <div className="flex items-center gap-3 pb-7">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-[#262626] ring-offset-2 ring-offset-neutral-100">
              <Image src={profilePhoto} alt={""} />
            </div>
          </div>
          <p>hello dear!</p>
        </div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="flex gap-3">
          <div className="-pt-1 -mb-2 border border-neutral-200" />
          <p>{subtitle}</p>
        </div>
        {children}
      </div>
      <AppBar />
    </div>
  );
}
