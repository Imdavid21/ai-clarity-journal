"use client";
import React, { useState, useEffect, useContext, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { JournalContext } from "../JournalContext.js";
import Image from "next/image";
import Button from "@/components/common/Button";
import DateTitle from "@/components/common/DateTitle";
import Header from "@/components/common/Header";
import "../../styles/global.css";

const Add: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Your submission logic here
    // Don't forget to set loading back to false when done
    setLoading(false);
  };

  return (
    <main className="mx-6 mt-10 pb-8 lg:max-w-screen-md lg:mx-auto">
      <Header />
      <DateTitle />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Your form and other elements here... */}
        <div className="flex justify-between mt-4 relative bottom-6 w-full -left-6 lg:max-w-screen-md lg:bottom-4 lg:relative lg:mx-auto">
          <Button
            buttonText="Cancel"
            isPrimary={false}
            onClick={handleBack}
            type="button"
            disabled={false}
          />
          <Button
            buttonText={loading ? "Loading..." : "Next"}
            isPrimary={true}
            onClick={() => {}}
            disabled={loading}
            type="submit"
          />
        </div>
      </form>
    </main>
  );
};

export default Add;
