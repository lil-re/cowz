import ConnectionButton from "./ConnectionButton";
import MintButton from "./MintButton";
import StakeButton from "./StakeButton";
import UnstakeButton from "./UnstakeButton";

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
            ? data.staking
              ? <UnstakeButton data={data} mint={mint} />
              : <MintButton data={data} mint={mint} />
            : <StakeButton data={data} mint={mint} />
          : <ConnectionButton connect={connect} />
      }
    </article>
  );
}

export default MintBlock;
