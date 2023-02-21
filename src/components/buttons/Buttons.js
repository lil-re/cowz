import ConnectionButton from "./ConnectionButton";
import MintButton from "./MintButton";
import StakeButton from "./StakeButton";
import UnstakeButton from "./UnstakeButton";
import Loading from "../Loading";

function Buttons ({ data, account, connect, mint, stake, unstake, claim, loading }) {
  if (loading) {
    return <Loading />
  } else if (!account) {
    return <ConnectionButton connect={connect} />
  } else if (data.balance > 0) {
    return <StakeButton data={data} stake={stake} />
  } else if (data.stakedCowId > 0) {
    return <UnstakeButton data={data} unstake={unstake} claim={claim} />
  } else {
    return <MintButton data={data} mint={mint} />
  }
}

export default Buttons;
