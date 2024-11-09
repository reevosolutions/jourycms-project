import chroma from 'chroma-js';
import * as React from 'react';
import DefaultLayout from '../../layouts/default.layout';
import HomepageHeroSection from '../homepage/sections/hero.section';
import HomepageContentSection from '../homepage/sections/content.section';



export type PageProps = JouryCMS.Theme.PageProps & {

}

const DesignPage: React.FC<PageProps> = ({ }) => {

  const darkblue = chroma.scale(['#dfebf1', '#273248']).mode("rgb").colors(11).reduce((prev, color, index) => ({ ...prev, [index === 0 ? "50" : index === 10 ? "950" : (index * 100).toString()]: color }), {} as { [key: string]: string });
  const beige = chroma.scale(['#e5d3a5', '#97655f']).mode("rgb").colors(11).reduce((prev, color, index) => ({ ...prev, [index === 0 ? "50" : index === 10 ? "950" : (index * 100).toString()]: color }), {} as { [key: string]: string });
  const red2 = chroma.scale(['#f1d5d2', '#cc3827']).mode("rgb").colors(11).reduce((prev, color, index) => ({ ...prev, [index === 0 ? "50" : index === 10 ? "950" : (index * 100).toString()]: color }), {} as { [key: string]: string });
  const turqoi = chroma.scale(['#afe1f1', '#8fd1c1']).mode("rgb").colors(11).reduce((prev, color, index) => ({ ...prev, [index === 0 ? "50" : index === 10 ? "950" : (index * 100).toString()]: color }), {} as { [key: string]: string });


  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <DefaultLayout>

      <HomepageHeroSection />
      <HomepageContentSection />



      <div className="flex flex-col min-h-screen items-center justify-center w-full py-20">

        {Object.entries({ darkblue, beige, red2, turqoi }).map(([name, colors]) => (
          <div className="flex gap-2 mb-4" key={name} dir="ltr">
            {Object.values(colors).map((color, index) => (
              <div className="d" key={index}>
                <div key={index} className="w-20 h-20" style={{ backgroundColor: color }}></div>
                <div className="text-xs text-center text-text-600 mt-1">{color}</div>
              </div>
            ))}
          </div>
        ))}

        {/* <pre dir="ltr">
          {JSON.stringify({ darkblue, beige, red2, turqoi }, null, 2)}
        </pre> */}
      </div>
    </DefaultLayout>
  )
}


export default DesignPage;