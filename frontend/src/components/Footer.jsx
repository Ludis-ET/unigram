// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGithub } from "@fortawesome/free-brands-svg-icons";
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTelegram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
// // import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
const Footer = () => {
  return (
    <footer>
     
      <div className="fixed bottom-0 w-full bg-gray-900 text-white p-4 text-center gap-5">
        <div className="text-xl font-mono">
        <p>
          Created with{" "}
          <a
            href="https://t.me/hackathon_G1"
            target="_blank"
            className="underline text-2xl"
          >
            Alpha
          </a>
        </p>
        </div>
        <div className="gap-5 flex items-center justify-center mt-5 "><a
          href="https://github.com/unigram-et/frontend"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-4"
        >
          {/* <FontAwesomeIcon icon={faGithub} size="2xl" /> */}
        </a>
        <a
          href="https://t.me/example"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTelegram} size="2xl" />
        </a>
        <a
          href="https://linkedin.com/in/example"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* <FontAwesomeIcon icon={faLinkedin} size="2xl" className="ml-9" /> */}
        </a></div>
        
        {/* <a href="mailto:example@example.com">
          <FontAwesomeIcon icon={faEnvelope} size="lg" />
        </a> */}
      </div>
    </footer>
  );
};

export default Footer;
