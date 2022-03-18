import React, { useState } from "react";
import cx from "classnames";
import Image from "next/image";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";
import Button from "../button";
import s from "./style.module.css";
import type { Item } from "../../interfaces";

interface Props {
  isModalOpen: boolean;
  item: Item;
  onModalClose: () => void;
}

const QuantitySelector = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (quantity: number) => void;
}) => {
  return (
    <div className="flex flex-row items-center mr-4 bg-white">
      <div
        className="w-10 h-10 flex justify-center items-center cursor-pointer select-none"
        onClick={() => onChange(value - 1)}
      >
        -
      </div>
      <input
        className="w-12 h-10 text-center"
        type="number"
        style={{ lineHeight: "40px" }}
        value={value}
        onChange={(e) => onChange(e.target.valueAsNumber)}
      />
      <div
        className="w-10 h-10 flex justify-center items-center cursor-pointer select-none"
        onClick={() => onChange(value + 1)}
      >
        +
      </div>
    </div>
  );
};

const CartPanelModal = ({ isModalOpen, item, onModalClose }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const hasStock = item.itemStock.quantityLeft > 0;

  return (
    <Modal
      isOpen={isModalOpen}
      className={cx(s.modal, "flex flex-col justify-center")}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.30)",
        },
      }}
    >
      <div
        className={cx(
          s.modalContent,
          "flex flex-col md:flex-row mx-auto relative"
        )}
      >
        <div className="flex-1 relative">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.label}
              layout="fill"
              objectFit="cover"
            />
          ) : null}
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex-1 p-6 pt-12 soverflow-y-auto">
            <h1 className="mb-3 text-2xl">{item.label}</h1>
            <div
              className="mb-3 text-sm"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </div>
          <div className="flex flex-row p-6 bg-zinc-200">
            <QuantitySelector value={quantity} onChange={setQuantity} />
            <Button
              className="flex-1 "
              onClick={() => alert("Add to cart")}
              disabled={!hasStock}
            >
              {hasStock ? (
                <>
                  Add (
                  {Intl.NumberFormat("sg", {
                    style: "currency",
                    currency: item.currency,
                  })
                    .format(item.unitPriceFractional)
                    .replace("SGD ", "$")}
                  )
                </>
              ) : (
                "Not Available"
              )}
            </Button>
          </div>
        </div>
        <button
          className="absolute top-0 right-0 z-10 pt-4 pr-4"
          onClick={() => {
            onModalClose();
          }}
        >
          <MdClose size={24} />
        </button>
      </div>
    </Modal>
  );
};

export default CartPanelModal;
