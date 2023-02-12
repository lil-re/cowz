function UnstakeButton ({ data, unstake }) {
    return (
        <div>
            <p className="card-text cost">
                You are already staking your Cow
            </p>
            <p className="card-text cost">
                You have earned x BabyCowz !
            </p>
            <p className="card-text">
                <button className="button button-primary" onClick={unstake}>
                    Unstake your Cow
                </button>
            </p>
        </div>
      );
}

export default UnstakeButton;
