declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Lib {
        namespace Logger {
          /**
           * Represents the context of a logger instance.
           */
          type InstanceContext =
            | "APPLICATION"
            | "MIDDLEWARE"
            | "SUBSCRIBER"
            | "BROKER"
            | "MAPPER"
            | "VALIDATOR"
            | "SANITIZER"
            | "COMPONENT"
            | "UTILITY"
            | "SEED"
            | "SERVICE"
            | "CONTROLLER"
            | "LOADER"
            | "MODEL"
            | "REDUX"
            | "HOOK"
            | "PAGE"
            | "MODAL"
            | "GUARD"
            | "FORM";

          /**
           * Represents the log type of a logger instance.
           */
          type LogType =
            | "INFO"
            | "WARN"
            | "ERROR"
            | "DEBUG"
            | "SUCCESS"
            | "SILLY"
            | "HTTP"
            | "EVENT"
            | "VALUE";

          /**
           * Represents the configuration of a logger instance.
           */
          type InstanceConfig = unknown;
        }
      }
    }
  }
}
