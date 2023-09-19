import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import CalendarDaysIcon from "@heroicons/react/24/outline/CalendarDaysIcon";
import ArrowRightOnRectangleIcon from "@heroicons/react/24/outline/ArrowRightOnRectangleIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import CurrencyDollarIcon from "@heroicons/react/24/outline/CurrencyDollarIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import KeyIcon from "@heroicons/react/24/outline/KeyIcon";
import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/app/dashboard",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Dashboard",
  },
  {
    path: "/app/users", // url
    icon: <UsersIcon className={iconClasses} />, // icon component
    name: "Users", // name that appear in Sidebar
  },
  {
    path: "/app/transactions", // url
    icon: <CurrencyDollarIcon className={iconClasses} />, // icon component
    name: "Subscription", // name that appear in Sidebar
  },
  {
    path: "", //no url needed as this has submenu
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, // icon component
    name: "Manage", // name that appear in Sidebar
    submenu: [
      {
        path: "/app/audio",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "Audio",
      },
      {
        path: "/app/playlist", //url
        icon: <UserIcon className={submenuIconClasses} />, // icon component
        name: "PlayList", // name that appear in Sidebar
      },
      {
        path: "/app/genre",
        icon: <KeyIcon className={submenuIconClasses} />,
        name: "Genre",
      },
    ],
  },
  {
    path: "/app/mentalHealth", // url
    icon: <CalendarDaysIcon className={iconClasses} />, // icon component
    name: "Mental Health", // name that appear in Sidebar
  },
  {
    path: "/app/question", // url
    icon: <CalendarDaysIcon className={iconClasses} />, // icon component
    name: "Question", // name that appear in Sidebar
  },
  {
    path: "/app/plan", // url
    icon: <CalendarDaysIcon className={iconClasses} />, // icon component
    name: "Plan", // name that appear in Sidebar
  },
  {
    path: "/app/degree", // url
    icon: <CalendarDaysIcon className={iconClasses} />, // icon component
    name: "Degree", // name that appear in Sidebar
  },
  {
    path: "/app/option", // url
    icon: <CalendarDaysIcon className={iconClasses} />, // icon component
    name: "Options", // name that appear in Sidebar
  },
  {
    path: "/app/exercise",
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, // icon component
    name: "Exercises", // name that appear in Sidebar
  },
];

export default routes;
