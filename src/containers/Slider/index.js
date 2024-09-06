import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [dataFocusSortedByDate, setDataFocusSortedByDate] = useState([]);

  useEffect(() => {
    if (data?.focus) {
      const sortedData = [...data.focus].sort((evtA, evtB) => 
        new Date(evtB.date) - new Date(evtA.date) // Tri décroissant
      );
      setDataFocusSortedByDate(sortedData);
    }
  }, [data?.focus]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex < dataFocusSortedByDate.length - 1 ? prevIndex + 1 : 0));
    }, 5000);
    
    return () => clearTimeout(timer); // Nettoyage du timer lors du démontage du composant
  }, [index, dataFocusSortedByDate.length]);

    return (
    <div className="SlideCardList">
      {/* rd Suppresion des <></> qui encapsulait 2 éléments différents */}   
      {dataFocusSortedByDate?.map((event, idx) => (
        <div key={event.date} className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
          {/* @rd Attribut alt modifié pour avoir les renseignements correspondants à l'image */}
          <img src={event.cover} alt={event.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
        // @rd Ajout de la fermeture du premier ".map"
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {dataFocusSortedByDate?.map((event, radioIdx) => (
            // @rd passer event pour l'index 
            // @rd {byDateDesc.map((_, radioIdx) 
            <input
              // @rd key={`${event.id}`} 
              key={event.date} // @rd correction events focus n'ont pas d'id et doit correspondre id img
              type="radio"
              name="radio-button"
              // @rd  index et non idx pour mise en évidence radio-button en cours
              //* @rd checked={idx === radioIdx}
              checked={index === radioIdx}
              readOnly
            // console error : Warning: You provided a `checked` prop to a form field without an `onChange` handler. 
            // This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
