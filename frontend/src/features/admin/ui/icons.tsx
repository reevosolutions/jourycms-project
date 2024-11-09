import { AiFillCloseCircle, AiOutlineHome } from "react-icons/ai";
import {
  BiLineChart,
  BiPieChartAlt2,
  BiPrinter,
  BiReset,
  BiTrash,
} from "react-icons/bi";
import {
  BsApple,
  BsBookmarkCheck,
  BsCalculator,
  BsCheckCircleFill,
  BsFacebook,
  BsFillBookmarkCheckFill,
  BsFillInfoCircleFill,
  BsGooglePlay,
  BsLinkedin,
  BsMegaphone,
  BsPinterest,
  BsTwitterX,
  BsUpcScan,
  BsYoutube,
} from "react-icons/bs";
import { CgMenuLeftAlt } from "react-icons/cg";
import {
  FaFacebookF,
  FaFemale,
  FaMale,
  FaMinusCircle,
  FaRegUser,
} from "react-icons/fa";
import {
  FaBoxesStacked,
  FaEnvelope,
  FaPeopleCarryBox,
  FaUser,
} from "react-icons/fa6";
import {
  FiCheck,
  FiInstagram,
  FiMinusCircle,
  FiPlus,
  FiSave,
} from "react-icons/fi";
import {
  GiBoxUnpacking,
  GiMoneyStack,
  GiPerspectiveDiceSixFacesRandom,
} from "react-icons/gi";
import {
  GoDesktopDownload,
  GoPasskeyFill,
  GoStop,
  GoTag,
} from "react-icons/go";
import {
  GrAttachment,
  GrDetach,
  GrLineChart,
  GrResume,
  GrSend,
  GrShieldSecurity,
  GrSystem,
} from "react-icons/gr";
import {
  HiArrowDown,
  HiArrowLeft,
  HiArrowRight,
  HiArrowUp,
  HiChevronDown,
  HiChevronLeft,
  HiChevronRight,
  HiChevronUp,
  HiLocationMarker,
  HiMoon,
  HiOutlineDotsHorizontal,
  HiOutlineDotsVertical,
  HiOutlineExternalLink,
  HiOutlineLocationMarker,
  HiOutlineLogin,
  HiOutlineLogout,
  HiOutlineRefresh,
  HiOutlineSwitchHorizontal,
  HiPencil,
  HiSearch,
  HiSun,
  HiSupport,
  HiUserGroup,
} from "react-icons/hi";
import { HiUserCircle } from "react-icons/hi2";
import {
  ImArrowDown,
  ImArrowLeft,
  ImArrowRight,
  ImArrowUp,
  ImAttachment,
  ImEye,
  ImPhone,
  ImPieChart,
} from "react-icons/im";
import {
  IoIosCopy,
  IoIosWarning,
  IoMdHelpCircle,
  IoMdStar,
  IoMdStarOutline,
} from "react-icons/io";
import {
  IoCalendarOutline,
  IoCamera,
  IoCloudUploadOutline,
  IoCodeSlash,
  IoLinkOutline,
  IoList,
  IoLogoTiktok,
  IoPauseSharp,
  IoPlayOutline,
} from "react-icons/io5";
import { LiaRobotSolid } from "react-icons/lia";
import { LuSearchX, LuSettings2 } from "react-icons/lu";
import {
  MdAddShoppingCart,
  MdCheckCircle,
  MdClose,
  MdError,
  MdErrorOutline,
  MdFilterList,
  MdManageSearch,
  MdOutlineFilterListOff,
  MdProductionQuantityLimits,
  MdSelectAll,
  MdSettings,
  MdTimer,
} from "react-icons/md";
import {
  PiChartLineUpBold,
  PiTable,
  PiTreeStructureBold,
} from "react-icons/pi";
import {
  RiComputerLine,
  RiFolderSettingsFill,
  RiLinkedinFill,
  RiRestTimeFill,
  RiShieldUserFill,
} from "react-icons/ri";
import { SiAdblock } from "react-icons/si";
import { TbApps } from "react-icons/tb";
import { VscGroupByRefType, VscUngroupByRefType } from "react-icons/vsc";

export { type IconType } from "react-icons/lib";

const Icons = {
  /**
   * Menu icons
   */
  Menu: {
    System: GrSystem,
    Applications: TbApps,
  },

  // menus
  MenuDotsHorizontal: HiOutlineDotsHorizontal,
  MenuDotsVertical: HiOutlineDotsVertical,
  Home: AiOutlineHome,

  // items
  Group: VscGroupByRefType,
  Ungroup: VscUngroupByRefType,
  // forms
  Play: IoPlayOutline,
  Pause: IoPauseSharp,
  Refresh: HiOutlineRefresh,
  Idle: RiRestTimeFill,
  Search: HiSearch,
  Plus: FiPlus,
  Save: FiSave,
  Send: GrSend,
  List: IoList,
  Edit: HiPencil,
  Close: MdClose,
  CloseFillCircle: AiFillCloseCircle,
  Delete: BiTrash,
  Error: MdError,
  ItemDetails: ImEye,
  Print: BiPrinter,
  Upload: IoCloudUploadOutline,
  Export: GoDesktopDownload,
  Download: GoDesktopDownload,
  Request: BsMegaphone,
  Attachment: ImAttachment,
  Filter: MdFilterList,
  FilterOff: MdOutlineFilterListOff,
  Enter: HiChevronRight,
  Manage: MdManageSearch,
  Check: FiCheck,
  CheckCircleFill: BsCheckCircleFill,
  MinusCircle: FiMinusCircle,
  MinusCircleFill: FaMinusCircle,
  SelectAll: MdSelectAll,
  BookmarkCheckFill: BsFillBookmarkCheckFill,
  BookmarkCheck: BsBookmarkCheck,
  Settings: MdSettings,
  Params: LuSettings2,
  System: GrSystem,
  Calendar: IoCalendarOutline,
  Reset: BiReset,
  SystemObject: RiFolderSettingsFill,
  ProtectedObject: GrShieldSecurity,
  Permission: GoPasskeyFill,
  Clipboard: IoIosCopy,
  Openable: GiBoxUnpacking,
  Scan: BsUpcScan,
  Camera: IoCamera,
  Support: HiSupport,
  Stop: GoStop,
  Robot: LiaRobotSolid,
  Random: GiPerspectiveDiceSixFacesRandom,
  Attach: GrAttachment,
  Detach: GrDetach,
  SearchX: LuSearchX,
  Block: SiAdblock,
  Resume: GrResume,
  Tree: PiTreeStructureBold,
  QuantityLimit: MdProductionQuantityLimits,
  Link: IoLinkOutline,
  ExternalLink: HiOutlineExternalLink,
  //
  InventoryItems: FaBoxesStacked,

  Calculator: BsCalculator,

  //
  Dev: IoCodeSlash,

  //
  Phone: ImPhone,
  Marker: HiLocationMarker,
  MarkerOutline: HiOutlineLocationMarker,
  Envelope: FaEnvelope,

  Category: GoTag,
  // navigation
  Navigation: {
    Back: HiArrowLeft,
    MenuLeft: CgMenuLeftAlt,
    SwitchHorizontal: HiOutlineSwitchHorizontal,
  },

  Marketplace: {
    AddToCart: MdAddShoppingCart,
  },
  // help
  Help: IoMdHelpCircle,

  Alert: {
    Success: MdCheckCircle,
    Error: MdError,
    ErrorOutline: MdErrorOutline,
    Warning: IoIosWarning,
    Info: BsFillInfoCircleFill,
  },

  Offices: {
    DroppingOffice: FaPeopleCarryBox,
    PaymentOffice: GiMoneyStack,
  },
  // chevrons
  Chevron: {
    Right: HiChevronRight,
    Left: HiChevronLeft,
    Up: HiChevronUp,
    Down: HiChevronDown,
  },

  // star
  StarFull: IoMdStar,
  StarEmpty: IoMdStarOutline,

  // arrows
  Arrow: {
    Right: ImArrowRight,
    Left: ImArrowLeft,
    Down: ImArrowDown,
    Up: ImArrowUp,
  },
  ArrowAlt: {
    Right: HiArrowRight,
    Left: HiArrowLeft,
    Down: HiArrowDown,
    Up: HiArrowUp,
  },

  // user
  User: {
    Logout: HiOutlineLogout,
    Login: HiOutlineLogin,
    // roles
    Master: RiShieldUserFill,
    User: FaRegUser,
    UserAlt: FaUser,
    UserCircle: HiUserCircle,
    Groups: HiUserGroup,
    // sex
    Male: FaMale,
    Female: FaFemale,
  },

  Table: PiTable,
  Charts: {
    Default: GrLineChart,
    Line: BiLineChart,
    LineUp: PiChartLineUpBold,
    LineUp2: GrLineChart,
    Pie: BiPieChartAlt2,
    PieFill: ImPieChart,
  },

  ThemeMode: {
    OS: RiComputerLine,
    Light: HiSun,
    Dark: HiMoon,
  },
  Apps: {
    Android: BsGooglePlay,
    Apple: BsApple,
  },
  Social: {
    Facebook2: BsFacebook,
    Facebook: FaFacebookF,
    Instagram: FiInstagram,
    Twitter: BsTwitterX,
    Youtube: BsYoutube,
    Pinterest: BsPinterest,
    Tiktok: IoLogoTiktok,
    LinkedIn: RiLinkedinFill,
    LinkedIn2: BsLinkedin,
  },

  Status: {
    Pending: MdTimer,
  },
};

export default Icons;
