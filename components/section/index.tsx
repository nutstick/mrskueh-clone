import React from "react";
import cx from "classnames";
import s from "./style.module.css";
import MenuCard from "../menu-card";
import type { SectionData } from "../../interfaces";

interface Props {
  section: SectionData;
}

const Section = ({ section }: Props) => {
  return (
    <div className={cx("mt-12", section.disabled && s.disabled)}>
      <div>
        <h1 className="mb-4 text-2xl">{section.label}</h1>
        <div
          className={cx(
            "font-medium mb-4",
            section.disabled && s.disabledLabel
          )}
        >
          {section.disabled ? section.description : section.disabledReason}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {section.items.map((item) => {
          return (
            <MenuCard key={item.id} item={item} disabled={section.disabled} />
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(Section);
