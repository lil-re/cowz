import ConnectionButton from "../buttons/ConnectionButton";

function IntroBlock ({ account, connect }) {
  return (
    <article className="card text-center">
      <img src="https://placedog.net/400/200/" alt="placeholder" />
      <h1 className="card-title">
        What are Cowz ? 
      </h1>
      <p className="card-text">
        Cowz is a small NFT Collection made for eductional purpose. The entire project is open source and documented. No money, no fame, no <strong>bullshit</strong>. Only moo.
      </p>
      <h1 className="card-title">
        What Cowz have to offer ? 
      </h1>
      <p className="card-text">
        Cowz owners are able to <strong>stake their NFTs</strong> to get BabyCowz. BabyCowz are a collection of unique NFTs that can ony be minted by Cowz farmerz.
      </p>
      <p className="card-text">
        Long term hodlers will also get <strong>huge discounts</strong> on our next projects.
      </p>
      <p className="card-text">
        Finally, you can join our Discord community of makers and NFT enthusiasts, where everybody can help each other and share their projects.
      </p>
      <p className="card-text">
        <a className="button button-blue" href="#">
          Join the Discord
        </a>
      </p>
    </article>
  );
}

export default IntroBlock;
