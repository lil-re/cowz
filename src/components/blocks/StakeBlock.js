import Buttons from "../buttons/Buttons";

function MintBlock ({ data, account, connect, mint, stake, unstake, loading }) {
  return (
    <article className="card text-center">
      <img src="https://placedog.net/400/200/" alt="placeholder" />
      <h1 className="card-title">
        Join the Farm !
      </h1>
      <p className="card-text">
        Put your cow in the farm to be able to mint exclusive BabyCowz NFTs ! BabyCowz can only be minted by Cowz owners !
      </p>
      <h1 className="card-title">
        How does it works ?!
      </h1>
      <p className="card-text">
        There are 2000 BabyCowz waiting for you. You can stake your cow on the farm and claim 1 BabyCow every 30 days. Each Cowz owner can mint up to 10 BabyCowz, for 0 ether !
      </p>
      <Buttons data={data} account={account} connect={connect} mint={mint} stake={stake} unstake={unstake} loading={loading} />
    </article>
  );
}

export default MintBlock;
