import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 6;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);
// @rd filtrer par 'type' et ensuite selon la page à afficher
// Filtrer les événements en fonction du type sélectionné
const eventsAfterFilteredByType = (!type
  ? data?.events
  : data?.events.filter((event) => event.type === type)) || [];
// conserver le nombre d'événements après filtrage par type
  const numberOfEventsAfterFilterByType = eventsAfterFilteredByType.length;

// Filtrer le premier résultat selon la page à afficher
const filteredEvents = eventsAfterFilteredByType.filter((event, index) => {
  if (
    (currentPage - 1) * PER_PAGE <= index &&
    PER_PAGE * currentPage > index
  ) {
    return true;
  }
  return false;
});
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };
  // @rd calcul du nombre de page erronnée
  // const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  const pageNumber = Math.ceil((numberOfEventsAfterFilterByType || 0) / PER_PAGE); // arrondi à l'entier supérieur
  const typeList = new Set(data?.events.map((event) => event.type));
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    // @rd ajout description pour l'image
                    imageAlt={event.description}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                    small={false}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
