import React from "react";
import MenuItem from "./menu-item";
import type { SectionData } from "../../interfaces";

interface Props {
  activeMenu?: SectionData["id"];
  sections: SectionData[];
}

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
