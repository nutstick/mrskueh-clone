import { useEffect, useMemo, useRef, useState } from "react";
import { SectionData } from "../interfaces";

export const useScrollspy = (data: SectionData[]) => {
  const ids = useMemo(() => data?.map(({ id }) => id) ?? [], [data]);
  const visible = useMemo(
    () =>
      ids.reduce(
        (prev, id) => ({ ...prev, [id]: false }),
        {} as Record<string, boolean>
      ),
    [ids]
  );
  const [activeMenu, setActiveMenu] = useState<SectionData["id"] | undefined>(
    ids?.[0]
  );

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const id = entry.target.id.split("-")[1];
        visible[id] = entry.intersectionRatio > 0;
      }

      const firstVisible = ids.find((id) => visible[id]);

      setActiveMenu(firstVisible);
    }, {});

    const { current: currentObserver } = observer;

    for (const id of ids) {
      const element = document.querySelector(`#section-${id}`);
      if (element) {
        currentObserver.observe(element);
      }
    }

    return () => currentObserver.disconnect();
  }, [ids, visible]);

  return [activeMenu] as const;
};
