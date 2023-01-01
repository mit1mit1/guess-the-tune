import { useStore } from "src/gameStore";
import { Modal } from "./Modal";

export const SupportUsModal = () => {
  const { showSupportUs, toggleSupportUs } = useStore();
  return (
    <Modal
      title="Support Us"
      visible={showSupportUs}
      toggleVisible={toggleSupportUs}
    >
      <p>Send through any feedback to guessthetunegame@gmail.com</p>
      <p>
        If you enjoy this game and reckon it's worth a few bucks, please
        consider donating to{" "}
        <a href="https://effectivealtruism.org.au/">effectivealtruism.org.au</a>{" "}
        or{" "}
        <a href="https://www.againstmalaria.com/default.aspx">
          againstmalaria.com
        </a>{" "}
        (or any other charity you know is doing good work).
      </p>
      <p>
        Feel free to let me know and I'll consider it game-development income.
      </p>
      <p>
        ;)
      </p>
    </Modal>
  );
};
