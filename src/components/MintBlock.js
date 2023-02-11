import ConnectionButton from "./ConnectionButton";
import MintButton from "./MintButton";

function MintBlock ({ data, accounts, connect, mint }) {
  const isConnected = Boolean(accounts[0])

  return (
    <article className="card text-center">
      <img src="https://placedog.net/400/200/" alt="placeholder" />
      <h1 className="card-title">
        Mint Cowz !
      </h1>
      {
        isConnected
          ? <MintButton data={data} mint={mint} />
          : <ConnectionButton connect={connect} />
      }
    </article>
  );
}

export default MintBlock;
