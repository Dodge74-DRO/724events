import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

// @rd fonction simule l'envoi d'un formulaire et attend 0.5 s pour retourner OK
const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

// @rd utilisation de 2 props "onSuccess et onError pour suivre l'envoi du formulaire"
const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
// @rd pbm onSuccess n'est pas mis à jour  pour l'ouverture de la modal "message envoyé ..."
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        // @rd indique la fin d'envoi
        setSending(false);
        // @rd indique que l'envoi est un succès
        onSuccess(true);
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            /* @rd correction orthographe "Personel" -> "Personnel" */
            /* @rd label="Personel / Entreprise" */
            selection={["Personnel", "Entreprise"]}
            onChange={() => null}
            /* @rd correction orthographe "Personel" -> "Personnel" */
            /* @rd label="Personel / Entreprise" */
            label="Personnel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
      <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
        {sending ? "En cours" : "Envoyer"}
      </Button>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
