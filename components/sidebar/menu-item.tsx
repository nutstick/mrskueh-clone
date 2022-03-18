import React, { useCallback } from "react";
import cx from "classnames";
import s from "./style.module.css";
import type { SectionData } from "../../interfaces";

interface Props {
  id: SectionData["id"];
  activeMenu?: SectionData["id"];
  children: React.ReactNode;
}

const MenuItem = ({ activeMenu, id, children }: Props) => {
  const onClick = useCallback(() => {
    const element = document.querySelector(`#section-${id}`);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY,
        behavior: "smooth",
      });
    }
  }, [id]);

  return (
    <li
      className={cx(
        "text-sm",
        "p-2",
        s.menuItem,
        id === activeMenu && s.active
      )}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

export default React.memo(MenuItem);
