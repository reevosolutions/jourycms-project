import {scale} from "chroma-js";
import * as React from "react";
import DefaultLayout from "../../layouts/default.layout";
import HomepageHeroSection from "../homepage/sections/hero.section";
import HomepageContentSection from "../homepage/sections/content.section";
import HomepageCallToActionSection from "../homepage/sections/account-call-to-action.section";
import { publicRoutes } from "@/config";

export type PageProps = JouryCMS.Theme.PageProps & {};

const DesignPage: React.FC<PageProps> = ({ }) => {
  // const darkblue = chroma.scale(['#dfebf1', '#273248']).mode("rgb").colors(11).reduce((prev, color, index) => ({ ...prev, [index === 0 ? "50" : index === 10 ? "950" : (index * 100).toString()]: color }), {} as { [key: string]: string });
  const darkblue = scale(["#dfebf1", "#7c8898", "#1c2232"])
    .mode("rgb")
    .colors(11)
    .reduce(
      (previous, color, index) => ({
        ...previous,
        [index === 0 ? "50" : index === 10 ? "950" : (index * 100).toString()]:
          color,
      }),
      {} as { [key: string]: string },
    );
  const beige = scale(["#e5d3a5", "#97655f"])
    .mode("rgb")
    .colors(11)
    .reduce(
      (previous, color, index) => ({
        ...previous,
        [index === 0 ? "50" : index === 10 ? "950" : (index * 100).toString()]:
          color,
      }),
      {} as { [key: string]: string },
    );
  const red2 = scale(["#f1d5d2", "#cc3827"])
    .mode("rgb")
    .colors(11)
    .reduce(
      (previous, color, index) => ({
        ...previous,
        [index === 0 ? "50" : index === 10 ? "950" : (index * 100).toString()]:
          color,
      }),
      {} as { [key: string]: string },
    );
  const turqoi = scale(["#cff2f8", "#8fd1c1"])
    .mode("rgb")
    .colors(11)
    .reduce(
      (previous, color, index) => ({
        ...previous,
        [index === 0 ? "50" : index === 10 ? "950" : (index * 100).toString()]:
          color,
      }),
      {} as { [key: string]: string },
    );

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <DefaultLayout route={publicRoutes.homepage}>
      <HomepageHeroSection />
      <HomepageContentSection />
      <HomepageCallToActionSection />

      <div className="flex min-h-screen w-full flex-col items-center justify-center py-20">
        {Object.entries({ darkblue, beige, red2, turqoi }).map(
          ([name, colors]) => (
            <div className="mb-4 flex gap-2" key={name} dir="ltr">
              {Object.values(colors).map((color, index) => (
                <div className="d" key={index}>
                  <div
                    key={index}
                    className="h-20 w-20"
                    style={{ backgroundColor: color }}
                  ></div>
                  <div className="mt-1 text-center text-xs text-text-600">
                    {color}
                  </div>
                </div>
              ))}
            </div>
          ),
        )}

        <pre dir="ltr">
          {JSON.stringify({ darkblue, beige, red2, turqoi }, null, 2)}
        </pre>
      </div>
    </DefaultLayout>
  );
};

export default DesignPage;
