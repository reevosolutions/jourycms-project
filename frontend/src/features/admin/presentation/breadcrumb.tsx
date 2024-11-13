import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import { LuChevronLeft, LuChevronRight, LuHome } from "react-icons/lu";

export type BreadcrumbComponentProps = JouryCMS.Theme.ComponentProps & {
  items: {
    title: string;
    path?: string;
  }[];
}

const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({ items }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem key="home">
          <BreadcrumbLink href="/" className=" text-sm hover:text-primary-600">
            <LuHome className="w-4 h-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        {items.map((item, index) => (
          <Fragment key={`fr-${index}`} >
            <BreadcrumbSeparator key={`sep-${index}`}>
              <LuChevronRight className="w-4 h-4 rtl:rotate-180" />
            </BreadcrumbSeparator>
            <BreadcrumbItem key={item.path || item.title} >
              <BreadcrumbLink className={cn(" text-sm", item.path && "hover:text-primary-600")} href={item.path}>{item.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadcrumbComponent;