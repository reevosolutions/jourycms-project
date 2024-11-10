declare module Levelup {
  namespace CMS {
    namespace V1 {
      export namespace UI {
        type IconType = (props: {
          className?: string | undefined;
          height?: number | string | undefined;
          id?: string | undefined;
          lang?: string | undefined;
          max?: number | string | undefined;
          media?: string | undefined;
          method?: string | undefined;
          min?: number | string | undefined;
          name?: string | undefined;
          style?: CSSProperties | undefined;
          target?: string | undefined;
          type?: string | undefined;
          width?: number | string | undefined;
          children?: React.ReactNode;
          size?: string | number;
          color?: string;
          title?: string;
        }) => JSX.Element;

      }
    }
  }
}
