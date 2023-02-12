import ConnectionButton from "./ConnectionButton";
import MintButton from "./MintButton";

function MintBlock ({ data, account, connect, mint }) {
  return (
    <article className="card text-center">
      <img src="https://placedog.net/400/200/" alt="placeholder" />
      <h1 className="card-title">
        Mint Cowz !
      </h1>
      {
        account
          ? data.balance === 0
            ? <MintButton data={data} mint={mint} />
            : <p className="card-text">You already have a Cow</p>
          : <ConnectionButton connect={connect} />
      }
    </article>
  );
}

export default MintBlock;
