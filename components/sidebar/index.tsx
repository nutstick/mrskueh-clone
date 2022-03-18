import React from "react";
import cx from "classnames";
import s from "./style.module.css";
import type { SectionData } from "../../interfaces";

interface Props {
  activeMenu?: SectionData["id"];
  sections: SectionData[];
}

const MenuItem = ({
  activeMenu,
  id,
  children,
}: {
  id: SectionData["id"];
  activeMenu?: SectionData["id"];
  children: React.ReactNode;
}) => {
  return (
    <li
      className={cx(
        "text-sm",
        "p-2",
        s.menuItem,
        id === activeMenu && s.active
      )}
      onClick={() => {
        alert("click");
      }}
    >
      {children}
    </li>
  );
};

const Sidebar = ({ activeMenu, sections }: Props) => {
  return (
    <ul className="sticky top-0 mr-6">
      {sections.map(({ id, label }) => (
        <MenuItem key={id} activeMenu={activeMenu} id={id}>
          {label}
        </MenuItem>
      ))}
    </ul>
  );
};

export default Sidebar;
