import { useStore } from "src/store/gameStore";
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
        <a href="https://www.givedirectly.org" target="_blank" rel="noreferrer">
          givedirectly.org
        </a>{" "}
        or{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.againstmalaria.com/default.aspx"
        >
          againstmalaria.com
        </a>{" "}
        (or any other charity you know is doing good work).
      </p>
      <p>
        Feel free to let me know and I'll consider it game-development income.
      </p>
      <p>
        If you want to see more of my work, check it out at
        <a
          target="_blank"
          rel="noreferrer"
          href="https://mit1mit1.github.io/index/"
        >
          mit1mit1.github.io/index/
        </a> ;)
      </p>
    </Modal>
  );
};
