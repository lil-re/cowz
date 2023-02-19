import Buttons from "../buttons/Buttons";
import CowDescription from "./CowDescription";

function MintBlock ({ data, account, connect, mint, stake, unstake, loading }) {
  return (
    <article className="card text-center">
      <img src="https://placedog.net/400/200/" alt="placeholder" />
      <h1 className="card-title">
        { data.cow ? data.cow.name : 'Become a web3 farmer !' }
      </h1>
      { data.cow && <CowDescription data={data} /> }
      <Buttons data={data} account={account} connect={connect} mint={mint} stake={stake} unstake={unstake} loading={loading} />
    </article>
  );
}

export default MintBlock;
