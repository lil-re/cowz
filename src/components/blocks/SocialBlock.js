import ConnectionButton from "../buttons/ConnectionButton";

function SocialBlock () {
  return (
    <article className="card text-center">
      <img src="https://placedog.net/400/200/" alt="placeholder" />
      <h1 className="card-title">
        Join our Discord !
      </h1>
      <p className="card-text">
        Join your fellow farmerz on our Discord server. We share all the news about Cowz NFTs and our next big projects on it !
      </p>
      <p className="card-text">
        We also aim to create link between members. Our Discord server is a place where everybody can share its own project to all farmerz.
      </p>
      <p className="card-text">
        <a className="button button-blue" href="#">
          Join the Discord
        </a>
      </p>
    </article>
  );
}

export default SocialBlock;
