import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { unstable_after as after } from "next/server";
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

  /**
   * Despues de que se haya renderizado el componente, se pone en cola una actualizacion
   * en la API de Sanity para que incremente en 1 el numero de vistas de la startup
   * con el id proporcionado.
   *
   * @param {string} id - El id de la startup a actualizar
   *
   * @returns {Promise<void>} La promesa se resuelve cuando se completa la actualizacion
   */
  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: (totalViews as number) + 1 })
        .commit()
  );

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
