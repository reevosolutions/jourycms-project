"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import initLogger, { LoggerContext } from "@/lib/logging";

const logger = initLogger(LoggerContext.FORM, 'LoginForm');

export type LoginFormProps = {};


const LoginForm: React.FC<LoginFormProps> = ({ }) => {


  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="">

      <div className="px-4 py-6 max-w-full ">
        <h2 className="text-3xl  text-center mb-6 font-bold text-darkblue-950">تسجيل الدخول</h2>

        <div className="field mb-4">
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input type="email" id="email" name="email" placeholder="البريد الإلكتروني" />
        </div>

        <div className="field mb-4">
          <Label htmlFor="password">كلمة المرور</Label>
          <Input type="password" id="password" name="password" placeholder="كلمة المرور" />
        </div>

        <div className="flex justify-center mt-6">
          <Button
            variant={"default"}
            onClick={() => {

            }}
            className=" text-2xl bg-darkblue-700 hocus:bg-darkblue-950 transition-colors"
          >تسجيل الدخول</Button>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;