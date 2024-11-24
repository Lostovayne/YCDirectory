import { STARTUP_VIEWS_QUERY } from "@/lib/queries";
import { client } from "@/sanity/lib/client";
import { FC, ReactElement } from "react";
import Ping from "./Ping";

interface ViewProps {
  id: string;
}

const View: FC<ViewProps> = async ({ id }): Promise<ReactElement> => {
  const { views: totalViews } = await client
    .withConfig({
      useCdn: false,
    })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  // TODO: Update the number of views

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">Views:{totalViews}</span>
      </p>
    </div>
  );
};

export default View;
