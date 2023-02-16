import ConnectionButton from "./ConnectionButton";
import MintButton from "./MintButton";
import StakeButton from "./StakeButton";
import UnstakeButton from "./UnstakeButton";

function MintBlock ({ data, account, connect, mint, stake, unstake, loading }) {
  return (
    <article className="card text-center">
      <img src="https://placedog.net/400/200/" alt="placeholder" />
      <h1 className="card-title">
        Mint Cowz !
      </h1>
      {
        !loading
          ? account
            ? data.balance === 0
              ? data.stakedCowId === 0
                ? <MintButton data={data} mint={mint} />
                : <UnstakeButton data={data} unstake={unstake} />
              : <StakeButton data={data} stake={stake} />
            : <ConnectionButton connect={connect} />
          : <p className="card-text">
            <mark>LOADING</mark>
          </p>
      }
    </article>
  );
}

export default MintBlock;
