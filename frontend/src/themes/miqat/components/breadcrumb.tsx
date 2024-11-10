import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { LuChevronLeft, LuChevronRight, LuHome } from "react-icons/lu";

export type BreadcrumbComponentProps = JouryCMS.Theme.ComponentProps & {
  route: Levelup.CMS.V1.UI.Routes.RouteItem;
}

const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({ route }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <LuHome className="w-4 h-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <LuChevronLeft className="w-4 h-4" />
        </BreadcrumbSeparator>
        <BreadcrumbItem >
          <BreadcrumbLink className=" text-xl hover:text-beige-400" href={route.path}>{route.title}</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadcrumbComponent;