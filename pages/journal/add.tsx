"use client";
import React, { useState, useEffect, useContext, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { JournalContext } from "../JournalContext.js";
import Image from "next/image";
import Button from "@/components/common/Button";
import DateTitle from "@/components/common/DateTitle";
import Header from "@/components/common/Header";
import "../../styles/global.css";

// Your other code here...

const Add: React.FC = () => {
  // Your state and other logic here...

  const router = useRouter();

  // Update the handleBack function here:
  const handleBack = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.back();
  };

  // Your other functions and logic here...

  return (
    <main className="mx-6 mt-10 pb-8 lg:max-w-screen-md lg:mx-auto">
      <Header />
      <DateTitle />
      <form className="flex flex-col gap-4">
        {/* Your form and other elements here... */}
        <div className="flex justify-between mt-4 relative bottom-6 w-full -left-6 lg:max-w-screen-md lg:bottom-4 lg:relative lg:mx-auto">
          <Button
            buttonText="Cancel"
            isPrimary={false}
            handleClick={handleBack}
            type="button"
            disabled={false}
          />
          <Button
            buttonText={loading ? "Loading..." : "Next"}
            isPrimary={true}
            handleClick={handleSubmit}
            disabled={loading}
            type="submit"
          />
        </div>
      </form>
    </main>
  );
};

export default Add;
