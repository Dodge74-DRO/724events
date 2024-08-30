import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
const byDateDesc = data?.focus.sort((evtA, evtB) =>
/* @rd  trier les éléments du slide par ordre décroissant et non croissant */
/* @rd  new Date(evtA.date) < new Date(evtB.date) ? -1 : 1 */
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    setTimeout(
/* @rd  length - 1 car index commence à 0 */
/*    () => setIndex(index < byDateDesc.length ? index + 1 : 0), */
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0), 
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${event.id}`}
                  type="radio"
                  name="radio-button"
           /* @rd  index et non idx pour mise en évidence radio-button en cours */
           /* @rd checked={idx === radioIdx} */
                  checked={index === radioIdx} 
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
