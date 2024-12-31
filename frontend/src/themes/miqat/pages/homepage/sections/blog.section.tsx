import React from "react";

export type HomepageBlogSectionProps = JouryCMS.Theme.ComponentProps & {};

const HomepageBlogSection: React.FC<HomepageBlogSectionProps> = ({
  children,
}) => {
  return (
    <div className="container mx-auto py-20">
      <article className="prose grid max-w-none grid-cols-1 gap-6 text-2xl lg:prose-xl">
        <div className="blog-section overflow-hidden rounded-xl bg-white shadow-lg">
          <h2 className="lg:pm-0 m-0 bg-red2-600 px-6 py-2 pt-4 text-white lg:mb-0 lg:mt-0">
            ما هي العمرة؟
          </h2>
          <div className="px-4 py-2 lg:px-6 bg-white">
            <p className="text-3xl">
              العمرة هي التعبد لله بالإحرام، والطواف بالبيت، والسعي بين الصفا
              والمروة، والحلق أو التقصير.
            </p>
          </div>
        </div>
        <div className="blog-section overflow-hidden rounded-xl bg-white shadow-lg">
          <h2 className="lg:pm-0 m-0 bg-red2-600 px-6 py-2 pt-4 text-white lg:mb-0 lg:mt-0">
            كيف أُحرِم؟
          </h2>
          <div className="px-4 py-2 lg:px-6 bg-white">
            <ul className="ul text-3xl">
              <li>
                يُحرم المسلمُ من المكان المحدد له شرعاً، ويمتنع عن المحظورات
                التي يمنع منها حال إحرامه
              </li>
              <li>
                {`
            يلبي قائلاً: "لبيك اللهم لبيك، لبيك لا شريك لك لبيك، إن الحمد
            والنعمة لك والملك، لا شريك لك"
            `}
              </li>
            </ul>
          </div>
        </div>
        <div className="blog-section overflow-hidden rounded-xl bg-white shadow-lg">
          <h2 className="lg:pm-0 m-0 bg-red2-600 px-6 py-2 pt-4 text-white lg:mb-0 lg:mt-0">
            الطواف
          </h2>
          <div className="px-4 py-2 lg:px-6 bg-white">
            <ul className="ul text-3xl">
              <li>
                يتجه إلى الحرم، ويطوف بالكعبة سبع مرات، جاعلًا الكعبة عن يساره،
                فيبتدئ بالحجر الأسود، وينتهي به
              </li>
              <li>وبعد انتهاء أشواط الطواف السبعة يصلي ركعتين في مكان مناسب</li>
            </ul>
          </div>
        </div>

        <div className="blog-section overflow-hidden rounded-xl bg-white shadow-lg">
          <h2 className="lg:pm-0 m-0 bg-red2-600 px-6 py-2 pt-4 text-white lg:mb-0 lg:mt-0">
            السعي
          </h2>
          <div className="px-4 py-2 lg:px-6 bg-white">
            <p className="text-3xl">
              يتوجه إلى الصفا، ويبتدئ منها السعي نحو المروة، فإذا وصل المروةَ
              أكمل شوطاً، ثم يعود إلى الصفا ليكمل الشوط الثاني، وهكذا حتى يتم ٧
              أشواط منتهياً بالمروة
            </p>
          </div>
        </div>
        <div className="blog-section overflow-hidden rounded-xl bg-white shadow-lg">
          <h2 className="lg:pm-0 m-0 bg-red2-600 px-6 py-2 pt-4 text-white lg:mb-0 lg:mt-0">
            الحلق والتقصير
          </h2>
          <div className="px-4 py-2 lg:px-6 bg-white">
            <ul className="ul text-3xl">
              <li>
                بعد تمام السعي، يتوجه الرجل إلى محلات الحلاقة، فيحلق أو يقصر
                شعره
              </li>
              <li>
                وتجمع المرأة شعرها، وتقص من أطرافه قدر أُنملة الإصبع (١ - ٢ سم)
              </li>
              <li>وبذلك تكون العمرة قد تمت وخرج المعتمر من إحرامه</li>
            </ul>
            <p className="text-3xl">
              من الآداب التي ينبغي للمعتمر الإلتزام بها أثناء العمرة تجنب إيذاء
              ضيوف الرحمن بالتدافع والدخول في أماكن الزحام، وعدم ارباك المعتمرين
              بمعاكسة اتجاه الطواف، والحرص على اتباع إرشادات المراقبين ورجال
              الأمن.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default HomepageBlogSection;
