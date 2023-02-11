import ConnectionButton from "./ConnectionButton";

function IntroBlock ({ accounts, connect }) {
  const isConnected = Boolean(accounts[0])

  return (
    <article className="card text-center">
      <img src="https://placedog.net/400/200/" alt="placeholder" />
      <h1 className="card-title">
        What are Cowz ? 
      </h1>
      <p className="card=text">
        Cowz is a small NFT Collection made for eductional purpose. The entire project is open source and documented. No money, no fame, no <strong>bullshit</strong>. Only moo.
      </p>
      <h1 className="card-title">
        What Cowz have to offer ? 
      </h1>
      <p className="card=text">
        By minting a Cow, you will get access to our private Discord community of makers and NFT enthusiasts, and where everybody can help each other. Cowz owners are also able to stake their NFTs to get Baby Cowz. Finally, long term hodlers will get huge discounts on our next projects.
      </p>
      { isConnected ? <span></span> : <ConnectionButton connect={connect} /> }
    </article>
  );
}

export default IntroBlock;
