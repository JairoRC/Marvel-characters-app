import { NavBar } from "@/components";
import style from "./Dashboard.module.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={style["layout-styled"]}>
      <div className={style["layout-flex"]}>
        <NavBar />
        <div className={style["layout-children"]}>{children}</div>
      </div>
    </div>
  );
}
