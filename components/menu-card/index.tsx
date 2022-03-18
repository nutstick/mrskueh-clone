import React, { useState } from "react";
import cx from "classnames";
import Image from "next/image";
import s from "./style.module.css";
import CartPanelModal from "../cart-panel-modal";
import Button from "../button";
import type { Item } from "../../interfaces";

interface Props {
  item: Item;
  disabled: boolean;
}

const MenuCard = ({ item, disabled }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const hasStock = !disabled && item.itemStock.quantityLeft > 0;

  return (
    <>
      <a
        className={cx(
          "flex",
          "flex-col",
          "rounded-md",
          "drop-shadow-lg",
          "overflow-hidden",
          "cursor-pointer",
          "select-none",
          s.root
        )}
        onClick={
          hasStock
            ? () => {
                setModalOpen(true);
              }
            : undefined
        }
      >
        <div className="aspect-1 relative">
          {item.imageUrl ? (
            <Image
              className="aspect-1"
              src={item.imageUrl}
              alt={item.label}
              layout="fill"
            />
          ) : null}
        </div>
        <div className="p-3 sm:p-5 flex flex-col justify-between flex-1 ">
          <div className="line-clamp-2">{item.label}</div>
          <div
            className="mt-1 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
          <div className="mt-3 sm:mt-6 flex flex-row justify-between items-center">
            <div className="flex-1 mr-4">
              {Intl.NumberFormat("sg", {
                style: "currency",
                currency: item.currency,
              })
                .format(item.unitPriceFractional)
                .replace("SGD ", "$")}
            </div>
            <Button onClick={() => setModalOpen(true)} disabled={!hasStock}>
              {hasStock ? "Add" : "Not available"}
            </Button>
          </div>
        </div>
      </a>

      <CartPanelModal
        item={item}
        isModalOpen={isModalOpen}
        onModalClose={() => {
          setModalOpen(false);
        }}
      />
    </>
  );
};

export default MenuCard;
