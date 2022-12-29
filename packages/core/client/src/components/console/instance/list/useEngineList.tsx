import React, { useEffect, useState } from "react";
import { getEngineVersionList } from "./service";

export const useEngineList = () => {
  const [engineList, setEngineList] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);

  const queryEngineList = async () => {
    const list = await getEngineVersionList();
    const engineOptions = list.map((d: any) => {
      return {
        label: d.version,
        value: d.version
      };
    });
    setEngineList(engineOptions);
  };

  useEffect(() => {
    queryEngineList();
  }, []);

  return [engineList];
};
