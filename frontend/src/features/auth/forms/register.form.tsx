"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import initLogger, { LoggerContext } from "@/lib/logging";
import { cn } from "@/lib/utils";
import { useState } from "react";


const logger = initLogger(LoggerContext.FORM, 'RegisterForm');

export type RegisterFormProps = {};


const RegisterForm: React.FC<RegisterFormProps> = ({ }) => {

  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [account_type, setAccount_type] = useState<'agency' | 'doctor' | 'escort'>('agency');

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="">

      <div className="px-4 py-6 max-w-full ">

        {/* field */}
        <div className="field mb-8">
          <Label className="text-2xl text-darkblue-500">{"نوع الحساب"}</Label>
          <div className="mt-3 grid grid-cols-3 gap-8">
            <button
              className={cn(
                "flex aspect-square items-center justify-center rounded-4xl border-2 bg-slate-100 transition-all",
                account_type === 'agency'
                  ? "border-orange-600 text-orange-600"
                  : "border-slate-100 text-darkblue-500",
              )}
              onClick={() => setAccount_type('agency')}
              aria-label="agency"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 453.4 453.4"
                className="fill-current"
              >
                <path d="M316 267c11-9 17-23 17-38v-13c22-4 38-23 38-47 0-16-10-30-24-35v-14a120 120 0 0 0-240 0v14c-15 5-25 19-25 35 0 24 17 43 38 47v13c0 15 7 29 17 38-28 26-45 62-45 101v76c0 5 4 9 9 9h251c5 0 9-4 9-9v-76a133 133 0 0 0-45-101zm-89 100-80-84 6-6 67 71a9 9 0 0 0 13 0l67-71 6 6-79 84zm0-69c9 0 17-1 26-4l11-4-37 39-37-39 11 4c8 3 17 4 26 4zm20-21-11 3v-18a9 9 0 0 0-18 0v18l-11-3-46-16c-14-5-22-18-22-32v-77c0-13 3-26 9-36a41 41 0 0 1 37-24l14 2c18 4 37 4 55 0 13-3 24-2 33 3 7 4 13 10 18 19 7 10 10 23 10 36v77c0 14-9 27-22 32l-46 16zm106-108c0 14-8 25-20 28v-48c11 0 20 9 20 20zm-253 0c0-11 9-20 21-20l-1 3v45c-11-3-20-14-20-28zm32-62c-3 5-6 11-7 18v-5a102 102 0 0 1 204 0v5c-2-7-5-13-8-18a61 61 0 0 0-71-31c-15 4-31 4-46 0-31-7-56 4-72 31zm-22 261c0-27 9-52 25-72l83 88v51H110v-67zm233 67H236v-51l82-88c16 20 25 45 25 72v67z" />
                <path d="m268 201-4 3c-2 1-5 1-7-1l-1-1a23 23 0 0 0-29-4 23 23 0 0 0-30 4l-1 1c-1 2-4 2-6 1l-5-3a9 9 0 0 0-10 15l4 3a23 23 0 0 0 31-4v-1l5-1c1 0 3 0 4 2a9 9 0 0 0 15 0c2-2 4-2 5-2l4 1 1 1c7 9 20 10 30 4l4-3a9 9 0 0 0-10-15z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm;