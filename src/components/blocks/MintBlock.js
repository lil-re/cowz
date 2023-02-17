import Buttons from "../buttons/Buttons";

function MintBlock ({ data, account, connect, mint, stake, unstake, loading }) {
  return (
    <article className="card text-center">
      <img src="https://placedog.net/400/200/" alt="placeholder" />
      <h1 className="card-title">
        Mint Cowz !
      </h1>
      <Buttons data={data} account={account} connect={connect} mint={mint} stake={stake} unstake={unstake} loading={loading} />
    </article>
  );
}

export default MintBlock;
