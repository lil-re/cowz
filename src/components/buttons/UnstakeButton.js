function UnstakeButton ({ data, unstake, claim }) {
    return (
        <div>
            <p className="card-text cost">
                You are already staking your Cow
            </p>
            <p className="card-text cost">
                You have earned {data.earned} BabyCowz !
            </p>
            {
                data.earned === 0
                    ? (
                        <p className="card-text">
                            <button className="button button-secondary" onClick={claim}>
                                Claim you BabyCowz
                            </button>
                        </p>
                    )
                    : ''
            }
            <p className="card-text">
                <button className="button button-green" onClick={unstake}>
                    Unstake your Cow
                </button>
            </p>
        </div>
      );
}

export default UnstakeButton;
