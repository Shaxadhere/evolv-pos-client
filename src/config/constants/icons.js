import { BsArchive, BsPlus, BsChevronLeft, BsSun, BsChevronDown, BsMoon, BsChevronRight, BsFillCaretDownFill, BsChevronUp, BsFileEarmarkBarGraph, BsFileText, BsGear, BsListUl, BsTag, BsTrash, BsArrowUpShort, BsArrowDownShort, BsCaretDown, BsCaretDownFill, BsCaretUp, BsCaretUpFill, BsCheckLg, BsThreeDotsVertical, BsDot } from "react-icons/bs"
import { HiOutlineBriefcase, HiOutlineCreditCard, HiOutlineQrcode } from "react-icons/hi"
import { AiFillDollarCircle, AiOutlineEdit, AiOutlineEye, AiOutlineInfoCircle, AiOutlineMail, AiOutlineMinus, AiOutlineUser } from "react-icons/ai"
import { GrRefresh } from "react-icons/gr"
import { FiFilter, FiMenu, FiSearch, FiUsers } from "react-icons/fi"
import { BiRefresh } from "react-icons/bi"
import { MdOndemandVideo } from "react-icons/md"
import ZoomMeetingIcon from "../../components/Icons/ZoomMeetingIcon"

const APP_ICONS = {
    MENU: FiMenu,
    EXAMS: BsFileText,
    EXAMS_LIST: BsListUl,
    COURSES: HiOutlineBriefcase,
    CATEGORIES_TAG: BsTag,
    ARCHIVE: BsArchive,
    LECTURES: MdOndemandVideo,
    USERS: FiUsers,
    EMAILS: AiOutlineMail,
    REPORTS: BsFileEarmarkBarGraph,
    BIN: BsTrash,
    SETTINGS: BsGear,
    SINGLE_USER: AiOutlineUser,
    FILTER: FiFilter,
    SEARCH: FiSearch,

    WARNING: AiOutlineInfoCircle,

    //actions
    EDIT: AiOutlineEdit,
    REFRESH: BiRefresh,
    ADD: BsPlus,
    MINUS: AiOutlineMinus,
    CHECK: BsCheckLg,
    WATCH: AiOutlineEye,

    //Navigation Icons
    LeftChevron: BsChevronLeft,
    RightChevron: BsChevronRight,
    UpChevron: BsChevronUp,
    DownChevron: BsChevronDown,
    UpArrow: BsArrowUpShort,
    DownArrow: BsArrowDownShort,
    CaretDown: BsCaretDown,
    CaretDownFill: BsCaretDownFill,
    CaretUp: BsCaretUp,
    CaretUpFill: BsCaretUpFill,
    OPTIONS: BsThreeDotsVertical,

    CASH: AiFillDollarCircle,
    CREDIT_CARD: HiOutlineCreditCard,
    QR_CODE: HiOutlineQrcode,

    DOT: BsDot,

    DropDownIcon: BsFillCaretDownFill,

    //Color Modes
    LighMode: BsSun,
    DarkMode: BsMoon,

}

export default APP_ICONS